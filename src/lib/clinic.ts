export const CLINIC = {
  name: "Dr. Ajay's Dental Centre",
  doctor: "Dr. Ajay Kumar N Sachdev",
  credentials: "MDS (Orthodontics), Owner/Director",
  address: "581/1, 3rd Floor, Pinnacle Krishna Building, DB Road, RS Puram, Coimbatore, Tamil Nadu, India",
  phone: "+91 98430 54225",
  tel: "tel:+919843054225",
  email: "contact@drajaysdental.com",
  rating: 4.8,
  reviews: 592,
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

export const TESTIMONIALS = [
  { name: "Priya Ramasamy", area: "Saibaba Colony", text: "My daughter's braces were handled with so much patience. Dr. Ajay explained every stage to us, and the result is beautiful." },
  { name: "Karthik Subramanian", area: "RS Puram", text: "I was scared of root canals for years. It was done in two sittings with almost no pain. Clean clinic, on-time appointments." },
  { name: "Meena Venkatesh", area: "Gandhipuram", text: "Walked in with a toothache on a weekday evening and was seen quickly. Clear pricing before they started anything." },
];

export const FAQS = [
  { q: "Do I need an appointment, or can I walk in?", a: "Walk-ins are welcome. A quick WhatsApp message before you come helps us keep your waiting time short." },
  { q: "How much does a root canal cost?", a: "Usually ₹4,500 to ₹9,000 depending on the tooth, plus a crown if needed. This is indicative; the exact cost is confirmed at your visit." },
  { q: "Are clear aligners right for me?", a: "Most mild to moderate crowding and spacing can be treated with aligners. Dr. Ajay will assess you and suggest aligners or braces honestly." },
  { q: "Where exactly is the clinic?", a: "3rd Floor, Pinnacle Krishna Building, DB Road, RS Puram, Coimbatore." },
];
