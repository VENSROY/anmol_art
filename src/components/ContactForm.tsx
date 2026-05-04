import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackEvent } from "../hooks/useAnalytics";
import type { ContactForm as IContactForm } from "../types";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name min 2 chars"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "10 digits required"),
  message: z.string().min(10, "Message min 10 chars"),
});

const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: IContactForm) => {
    try {
      trackEvent({
        category: "Contact",
        action: "Form Submitted",
        label: data.name,
      });

      // Send email via API (EmailJS or custom backend)
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent! We'll contact you soon.");
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send. Try WhatsApp instead.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <input
          {...register("name")}
          placeholder="Your Name"
          className="w-full px-4 py-3 border border-royal-gold/30 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-royal-gold outline-none transition"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-3 border border-royal-gold/30 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-royal-gold outline-none transition"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("phone")}
          placeholder="10-digit phone"
          className="w-full px-4 py-3 border border-royal-gold/30 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-royal-gold outline-none transition"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Your message..."
          rows={4}
          className="w-full px-4 py-3 border border-royal-gold/30 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-royal-gold outline-none transition"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-royal-gold text-royal-maroon font-bold py-3 rounded-lg hover:bg-royal-gold/90 transition disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;