import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "./App";

/* ─── Mocks ─── */
// IntersectionObserver and scrollIntoView are mocked in test-setup.js

/* ─── Helpers ─── */
const renderApp = () => render(<App />);

/* ════════════════════════════════════════════
   1. RENDER
════════════════════════════════════════════ */
describe("App renders", () => {
  it("mounts without crashing", () => {
    renderApp();
    expect(document.body).toBeTruthy();
  });

  it("shows RNT logo / brand text", () => {
    renderApp();
    expect(screen.getAllByText(/RNT/i).length).toBeGreaterThan(0);
  });
});

/* ════════════════════════════════════════════
   2. LANGUAGE TOGGLE
════════════════════════════════════════════ */
describe("Language toggle", () => {
  it("starts in English — shows English nav labels", () => {
    renderApp();
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
  });

  it("shows EN and हि labels on the toggle button", () => {
    renderApp();
    expect(screen.getAllByText("EN").length).toBeGreaterThan(0);
    expect(screen.getAllByText("हि").length).toBeGreaterThan(0);
  });

  it("switches to Hindi when toggle is clicked", async () => {
    const user = userEvent.setup();
    renderApp();

    // The desktop toggle button contains Globe icon + EN + | + हि
    const toggleBtn = screen.getAllByTitle("Switch Language")[0];
    await user.click(toggleBtn);

    // Hindi nav label should now appear
    expect(screen.getAllByText("होम").length).toBeGreaterThan(0);
  });

  it("switches back to English on second click", async () => {
    const user = userEvent.setup();
    renderApp();

    const toggleBtn = screen.getAllByTitle("Switch Language")[0];
    await user.click(toggleBtn); // → Hindi
    await user.click(toggleBtn); // → English

    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
  });
});

/* ════════════════════════════════════════════
   3. DARK MODE TOGGLE
════════════════════════════════════════════ */
describe("Dark mode toggle", () => {
  it("toggles dark mode on/off", async () => {
    const user = userEvent.setup();
    renderApp();

    const root = document.querySelector("div[class*='bg-white']");
    expect(root).toBeTruthy();

    const darkBtn = screen.getAllByTitle("Dark Mode")[0];
    await user.click(darkBtn);

    // After toggling, title should change to "Light Mode"
    expect(screen.getAllByTitle("Light Mode").length).toBeGreaterThan(0);
  });
});

/* ════════════════════════════════════════════
   4. NAVIGATION
════════════════════════════════════════════ */
describe("Navigation", () => {
  const navItems = ["Home", "About", "Doctors", "Services", "Timing", "Reviews", "Location", "Contact"];

  navItems.forEach((label) => {
    it(`renders nav link: ${label}`, () => {
      renderApp();
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });
});

/* ════════════════════════════════════════════
   5. HERO SECTION
════════════════════════════════════════════ */
describe("Hero section", () => {
  it("shows hero title RNT Memorial", () => {
    renderApp();
    expect(screen.getAllByText(/RNT Memorial/i).length).toBeGreaterThan(0);
  });

  it("shows Call Now button", () => {
    renderApp();
    expect(screen.getAllByText(/Call Now/i).length).toBeGreaterThan(0);
  });

  it("shows WhatsApp button", () => {
    renderApp();
    expect(screen.getAllByText(/WhatsApp/i).length).toBeGreaterThan(0);
  });

  it("shows tagline in both languages", () => {
    renderApp();
    expect(screen.getAllByText("Your Health, Our Commitment").length).toBeGreaterThan(0);
    expect(screen.getAllByText("आपका स्वास्थ्य हमारी प्रतिबद्धता").length).toBeGreaterThan(0);
  });

  it("shows trust badges", () => {
    renderApp();
    expect(screen.getByText("AIIMS Trained Doctors")).toBeInTheDocument();
    expect(screen.getByText("IVF Facility")).toBeInTheDocument();
    expect(screen.getByText("Ambulance 24/7")).toBeInTheDocument();
  });
});

/* ════════════════════════════════════════════
   6. ABOUT SECTION
════════════════════════════════════════════ */
describe("About section", () => {
  it("shows About heading", () => {
    renderApp();
    expect(screen.getByText("About Our Clinic")).toBeInTheDocument();
  });

  it("shows Book Appointment button", () => {
    renderApp();
    expect(screen.getAllByText(/Book.*Appointment/i).length).toBeGreaterThan(0);
  });
});

/* ════════════════════════════════════════════
   7. DOCTORS SECTION
════════════════════════════════════════════ */
describe("Doctors section", () => {
  it("shows section heading", () => {
    renderApp();
    expect(screen.getByText("Our Expert Doctors")).toBeInTheDocument();
  });

  it("shows Dr. Amit Kumar", () => {
    renderApp();
    expect(screen.getByText("Dr. Amit Kumar")).toBeInTheDocument();
  });

  it("shows Dr. Swati Yadav", () => {
    renderApp();
    expect(screen.getByText("Dr. Swati Yadav")).toBeInTheDocument();
  });

  it("shows doctor degrees", () => {
    renderApp();
    expect(screen.getByText(/M\.B\.B\.S.*VIMS.*M\.D.*Medicine.*DMCH/i)).toBeInTheDocument();
  });

  it("shows Book Appointment buttons for doctors", () => {
    renderApp();
    expect(screen.getAllByText("Book Appointment").length).toBeGreaterThanOrEqual(2);
  });
});

/* ════════════════════════════════════════════
   8. SERVICES SECTION
════════════════════════════════════════════ */
describe("Services section", () => {
  it("shows Our Services heading", () => {
    renderApp();
    expect(screen.getAllByText(/Our Services/i).length).toBeGreaterThan(0);
  });

  const services = [
    "General Medicine",
    "Gynecology & Obstetrics",
    "IVF Treatment",
    "Patient Admission",
    "Ambulance Service",
  ];

  services.forEach((svc) => {
    it(`shows service: ${svc}`, () => {
      renderApp();
      expect(screen.getAllByText(svc).length).toBeGreaterThan(0);
    });
  });

  it("shows IVF banner", () => {
    renderApp();
    expect(screen.getByText("IVF Facility Now Available!")).toBeInTheDocument();
  });
});

/* ════════════════════════════════════════════
   9. TIMING SECTION
════════════════════════════════════════════ */
describe("Timing section", () => {
  it("shows Clinic Timings heading", () => {
    renderApp();
    expect(screen.getByText("Clinic Timings")).toBeInTheDocument();
  });

  it("shows Saturday & Sunday", () => {
    renderApp();
    expect(screen.getAllByText(/Saturday.*Sunday/i).length).toBeGreaterThan(0);
  });

  it("shows 12 PM – 4 PM", () => {
    renderApp();
    expect(screen.getAllByText(/12 PM.*4 PM/i).length).toBeGreaterThan(0);
  });

  it("shows emergency call text", () => {
    renderApp();
    expect(screen.getByText("Emergency? Call Anytime!")).toBeInTheDocument();
  });
});

/* ════════════════════════════════════════════
   10. CONTACT SECTION
════════════════════════════════════════════ */
describe("Contact section", () => {
  it("shows Contact Us heading", () => {
    renderApp();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("shows Call Us Directly heading", () => {
    renderApp();
    expect(screen.getByText("Call Us Directly")).toBeInTheDocument();
  });

  it("renders all 3 phone numbers as tel: links", () => {
    renderApp();
    const phones = ["8809434588", "8544106163", "9162033027"];
    phones.forEach((num) => {
      const links = document.querySelectorAll(`a[href="tel:${num}"]`);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("renders WhatsApp link with correct number", () => {
    renderApp();
    const waLinks = document.querySelectorAll(`a[href*="wa.me/918809434588"]`);
    expect(waLinks.length).toBeGreaterThan(0);
  });

  it("shows Send an Enquiry heading", () => {
    renderApp();
    expect(screen.getByText("Send an Enquiry")).toBeInTheDocument();
  });

  it("shows Your Name label", () => {
    renderApp();
    expect(screen.getByText("Your Name")).toBeInTheDocument();
  });

  it("shows Phone Number label", () => {
    renderApp();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });

  it("shows Message label", () => {
    renderApp();
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("renders name input field", () => {
    renderApp();
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("renders phone input field", () => {
    renderApp();
    expect(screen.getByPlaceholderText("Enter your phone number")).toBeInTheDocument();
  });

  it("renders message textarea", () => {
    renderApp();
    expect(screen.getByPlaceholderText("How can we help you?")).toBeInTheDocument();
  });

  it("shows Send Enquiry button", () => {
    renderApp();
    expect(screen.getByText("Send Enquiry")).toBeInTheDocument();
  });

  it("can type into name field", async () => {
    const user = userEvent.setup();
    renderApp();
    const nameInput = screen.getByPlaceholderText("Enter your name");
    await user.type(nameInput, "Sanjana");
    expect(nameInput.value).toBe("Sanjana");
  });

  it("can type into phone field", async () => {
    const user = userEvent.setup();
    renderApp();
    const phoneInput = screen.getByPlaceholderText("Enter your phone number");
    await user.type(phoneInput, "9876543210");
    expect(phoneInput.value).toBe("9876543210");
  });

  it("can type into message textarea", async () => {
    const user = userEvent.setup();
    renderApp();
    const textarea = screen.getByPlaceholderText("How can we help you?");
    await user.type(textarea, "I need an appointment");
    expect(textarea.value).toBe("I need an appointment");
  });

  it("phone input has type=tel", () => {
    renderApp();
    const phoneInput = screen.getByPlaceholderText("Enter your phone number");
    expect(phoneInput).toHaveAttribute("type", "tel");
  });
});

/* ════════════════════════════════════════════
   11. LOCATION SECTION
════════════════════════════════════════════ */
describe("Location section", () => {
  it("shows Find Us heading", () => {
    renderApp();
    expect(screen.getByText("Find Us")).toBeInTheDocument();
  });

  it("shows Vishwakarma Bazar Complex", () => {
    renderApp();
    expect(screen.getAllByText(/Vishwakarma Bazar/i).length).toBeGreaterThan(0);
  });

  it("shows Open in Google Maps link", () => {
    renderApp();
    expect(screen.getByText("Open in Google Maps")).toBeInTheDocument();
  });

  it("Google Maps link opens in new tab", () => {
    renderApp();
    const mapsLink = screen.getByText("Open in Google Maps").closest("a");
    expect(mapsLink).toHaveAttribute("target", "_blank");
  });

  it("renders the map iframe", () => {
    renderApp();
    expect(document.querySelector("iframe[title='Clinic Location']")).toBeInTheDocument();
  });
});

/* ════════════════════════════════════════════
   12. TESTIMONIALS / REVIEWS
════════════════════════════════════════════ */
describe("Testimonials section", () => {
  it("shows What Our Patients Say heading", () => {
    renderApp();
    expect(screen.getByText("What Our Patients Say")).toBeInTheDocument();
  });

  it("renders testimonial dot navigation buttons", () => {
    renderApp();
    // 5 testimonials → 5 dot buttons; they have no text so query by role
    // They are inside the testimonials section
    const section = document.getElementById("testimonials");
    const dots = section?.querySelectorAll("button[class*='rounded-full']");
    expect(dots?.length).toBeGreaterThanOrEqual(5);
  });
});

/* ════════════════════════════════════════════
   13. FOOTER
════════════════════════════════════════════ */
describe("Footer", () => {
  it("shows copyright text", () => {
    renderApp();
    expect(screen.getByText(/© 2026 RNT Memorial Clinic/i)).toBeInTheDocument();
  });

  it("shows Quick Links in footer", () => {
    renderApp();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
  });

  it("shows phone numbers in footer", () => {
    renderApp();
    // Phone numbers appear multiple times (contact section + footer)
    expect(screen.getAllByText(/8809434588/).length).toBeGreaterThan(0);
  });
});

/* ════════════════════════════════════════════
   14. HINDI TRANSLATION COVERAGE
════════════════════════════════════════════ */
describe("Hindi translations after language switch", () => {
  it("nav labels change to Hindi", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getAllByTitle("Switch Language")[0]);
    expect(screen.getAllByText("होम").length).toBeGreaterThan(0);
    expect(screen.getAllByText("डॉक्टर").length).toBeGreaterThan(0);
    expect(screen.getAllByText("सेवाएं").length).toBeGreaterThan(0);
  });

  it("contact section labels change to Hindi", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getAllByTitle("Switch Language")[0]);
    expect(screen.getAllByText("संपर्क करें").length).toBeGreaterThan(0);
    expect(screen.getAllByText("पूछताछ भेजें").length).toBeGreaterThan(0);
  });

  it("form placeholders change to Hindi", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getAllByTitle("Switch Language")[0]);
    expect(screen.getByPlaceholderText("अपना नाम दर्ज करें")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("अपना फ़ोन नंबर दर्ज करें")).toBeInTheDocument();
  });
});
