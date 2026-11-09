export const CLINIC = {
  name: "Dr. Ajay's Dental Centre",
  doctor: "Dr. Ajay Kumar N Sachdev",
  credentials: "MDS (Orthodontics), Owner/Director",
  address: "581/1, 3rd Floor, Pinnacle Krishna Building, DB Road, RS Puram, Coimbatore, Tamil Nadu, India",
  phone: "+91 98430 54225",
  tel: "tel:+919843054225",
  email: "contact@drajaysdental.com",
  rating: 4.4,
  reviews: 49,
  whatsapp: `https://wa.me/919843054225?text=${encodeURIComponent("Hello Dr. Ajay's Dental Centre, I'd like to book an appointment.")}`,
  maps: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Dr. Ajay's Dental Centre DB Road RS Puram Coimbatore"),
  mapEmbed: "https://www.google.com/maps?q=" + encodeURIComponent("Pinnacle Krishna Building, DB Road, RS Puram, Coimbatore") + "&output=embed",
};

// Hours are placeholders: confirm with the clinic before launch.
export const HOURS = [
  { day: "Monday – Saturday", time: "10:00 AM – 1:30 PM, 4:30 PM – 8:30 PM" },
  { day: "Sunday", time: "By appointment" },
];

export const TREATMENTS = [
  { name: "Scaling & Polishing", price: "₹1,000 – ₹2,500", desc: "A gentle professional clean that removes tartar and coffee or tea stains, and keeps gum problems from starting." },
  { name: "Root Canal Treatment", price: "₹4,500 – ₹9,000", desc: "Saves an infected tooth instead of removing it. Done under local anaesthesia, usually in one or two sittings." },
  { name: "Braces & Orthodontics", price: "₹35,000 – ₹90,000", desc: "Metal and ceramic braces planned personally by Dr. Ajay, an MDS orthodontist, for children and adults." },
  { name: "Clear Aligners", price: "₹80,000 – ₹2,50,000", desc: "Nearly invisible, removable trays that straighten teeth gradually. Good for working professionals." },
  { name: "Dental Implants", price: "₹25,000 – ₹45,000 per implant", desc: "A fixed, natural-looking replacement for a missing tooth, built on a titanium post." },
  { name: "Crowns, Fillings & Smile Care", price: "₹1,500 – ₹15,000", desc: "Tooth-coloured fillings, ceramic and zirconia crowns, and whitening to restore strength and confidence." },
];

// Real patient reviews, quoted from the clinic's Google reviews (positive ones only).
export const TESTIMONIALS: { name: string; source: string; text: string; treatment?: string }[] = [
  { name: "krishna murthy", source: "Google review", treatment: "Root Canal Treatment", text: "I had a root canal treatment & crown fixing done at Dr. Ajay's Dental Centre. Very clear-cut explanation in context to the treatment. Excellent treatment, care and services taken to the patients by the team of doctors and other assistants." },
  { name: "Nilesh Suresh", source: "Google review · Local Guide", text: "The best dental clinic in Coimbatore! A very experienced doctor with a Midas touch. Clean, neat, well trained assistants. State of the art equipment. An amazing experience altogether." },
  { name: "Sneha Sundar", source: "Google review", text: "My family and I have been visiting the clinic for years now. It's very clean and spacious. The staff and doctors are super nice, friendly and really qualified. There's no question about quality of service, any issues are promptly solved." },
];

export const FAQS = [
  { q: "Do I need an appointment, or can I walk in?", a: "Walk-ins are welcome. A quick WhatsApp message before you come helps us keep your waiting time short." },
  { q: "How much does a root canal cost?", a: "Usually ₹4,500 to ₹9,000 depending on the tooth, plus a crown if needed. This is indicative; the exact cost is confirmed at your visit." },
  { q: "Are clear aligners right for me?", a: "Most mild to moderate crowding and spacing can be treated with aligners. Dr. Ajay will assess you and suggest aligners or braces honestly." },
  { q: "Where exactly is the clinic?", a: "3rd Floor, Pinnacle Krishna Building, DB Road, RS Puram, Coimbatore." },
];

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const TREATMENT_PAGES = TREATMENTS.map((t) => ({ ...t, slug: slugify(t.name) }));
