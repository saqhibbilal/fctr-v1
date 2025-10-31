import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

const countries = [
  { value: 'us', label: 'United States', code: '+1' },
  { value: 'uk', label: 'United Kingdom', code: '+44' },
  { value: 'ca', label: 'Canada', code: '+1' },
  { value: 'au', label: 'Australia', code: '+61' },
  { value: 'nz', label: 'New Zealand', code: '+64' },
  { value: 'in', label: 'India', code: '+91' },
  { value: 'sg', label: 'Singapore', code: '+65' },
  { value: 'ae', label: 'UAE', code: '+971' },
];

const formSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      'Please enter a valid email address'
    ),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => {
      // Remove all non-digit characters for validation
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }, 'Phone number must be between 7 and 15 digits')
    .refine((val) => {
      const country = countries.find(c => val.startsWith(c.code));
      return !!country;
    }, 'Phone number must start with a valid country code'),
  
  country: z.string()
    .min(1, 'Please select your country')
    .refine((val) => countries.some(c => c.value === val), 'Please select a valid country'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .refine((val) => val.trim().length > 0, 'Message cannot be empty'),
  subject: z.string().min(1, 'Please select a subject'),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
       phone: '',
       country: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          number: data.phone,
          country: countries.find(c => c.value === data.country)?.label || data.country,
          subject: data.subject,
          inquiry: data.message,
        }),
      });
      if (response.ok) {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for reaching out. Our team will get back to you within 24-48 hours.",
          className: "border-primary/50 bg-primary/10 dark:border-primary/30 dark:bg-primary/20",
        });
        form.reset();
        onClose();
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.error || 'Failed to send your message. Please try again later.',
          variant: 'destructive',
          className: "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: 'Failed to send your message. Please try again later.',
        variant: "destructive",
        className: "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Contact Us</DialogTitle>
          <DialogDescription className="text-sm">
            Fill out the form below and we'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Name</FormLabel>
                  <FormControl>
                    <Input className="text-sm" placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={`${countries.find(c => c.value === form.getValues().country)?.code || 'Select country first'} Phone number`}
                            {...field}
                            onChange={(e) => {
                              let value = e.target.value;
                              const selectedCountry = countries.find(c => c.value === form.getValues().country);
                              
                              // If country is selected and phone doesn't start with country code
                              if (selectedCountry && !value.startsWith(selectedCountry.code)) {
                                value = selectedCountry.code + value;
                              }
                              
                              // Only allow digits, plus sign, and spaces
                              value = value.replace(/[^\d+\s]/g, '');
                              
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-background">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Industrial training">Industrial training</SelectItem>
                      <SelectItem value="Request for Quote">Request for Quote</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Courses">Courses</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}