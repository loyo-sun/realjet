import { ArrowLeft, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";
import { openAnalyticsConsentSettings } from "../../precast-beam-factory/shared/analytics";

const sections = [
  ["who-we-are", "1. Who We Are"],
  ["information-we-collect", "2. Information We Collect"],
  ["how-we-use-information", "3. How We Use Personal Information"],
  ["legal-bases", "4. Legal Bases"],
  ["sharing", "5. When We Share Personal Information"],
  ["international-transfers", "6. International Data Transfers"],
  ["retention", "7. How Long We Keep Information"],
  ["security", "8. Information Security"],
  ["your-rights", "9. Your Rights"],
  ["cookies", "10. Cookies and Similar Technologies"],
  ["children", "11. Children’s Information"],
  ["third-party-links", "12. Third-Party Links"],
  ["changes", "13. Changes to This Privacy Policy"],
  ["contact", "14. Contact Us"],
];

function PolicySection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-[clamp(21px,2.2vw,26px)] leading-[1.25] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h2>
      <div className="policy-copy mt-4 space-y-4 text-[15px] leading-[1.75] text-muted">{children}</div>
    </section>
  );
}

function ContactCard() {
  return (
    <div className="mt-5 rounded-card border border-brand-blue/15 bg-soft p-5">
      <strong className="block text-[16px] font-[850] text-brand-navy">Changsha Ruijie Machinery Technology Co., Ltd.</strong>
      <div className="mt-4 grid gap-3 text-[14px]">
        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 shrink-0 text-brand-blue" size={17} aria-hidden="true" />
          <span>No. 48, Jinzhou New District (Jinzhou Development Zone), Ningxiang, Changsha, Hunan, China</span>
        </div>
        <a href="mailto:loyosun@gmail.com" className="flex items-center gap-2.5 font-[750] text-brand-blue underline decoration-brand-blue/25 underline-offset-3 hover:text-brand-navy">
          <Mail size={17} aria-hidden="true" />
          loyosun@gmail.com
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-30 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
        <div className="site-container flex h-full items-center justify-between gap-5">
          <a href="../../precast-beam-factory/en/" aria-label="Realjet precast production lines">
            <img src={logoImage} alt="Realjet logo" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
          </a>
          <a href="../../precast-beam-factory/en/" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white">
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="max-[430px]:hidden">Back to Production Lines</span>
            <span className="hidden max-[430px]:inline">Back</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero-gradient text-white">
          <div className="site-container py-16 max-[720px]:py-12">
            <div className="flex max-w-[820px] items-start gap-5">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-cyan/25 bg-white/8 text-brand-cyan max-[720px]:hidden">
                <ShieldCheck size={27} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Data Protection</p>
                <h1 className="mt-2 text-[clamp(36px,5vw,56px)] leading-[1.08] font-[900] tracking-[-0.04em]">Privacy Policy</h1>
                <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-white/72 max-[720px]:text-[15px]">
                  This policy explains how Realjet collects, uses, stores, shares and protects personal information submitted through our website and project enquiry forms.
                </p>
                <p className="mt-5 text-[12px] font-[750] text-white/55">Effective date: 1 August 2026</p>
              </div>
            </div>
          </div>
        </section>

        <div className="site-container grid grid-cols-[250px_minmax(0,1fr)] gap-12 py-16 max-[1000px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:py-10">
          <aside className="max-[1000px]:order-2">
            <nav aria-label="Privacy policy contents" className="sticky top-24 rounded-card border border-line bg-soft p-5 max-[1000px]:static">
              <strong className="text-[13px] font-[850] tracking-[0.06em] text-brand-blue uppercase">On This Page</strong>
              <ol className="mt-3 grid gap-1.5">
                {sections.map(([id, title]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="block rounded-md px-2 py-1.5 text-[12px] leading-[1.35] text-muted transition hover:bg-white hover:text-brand-navy">
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[830px]">
            <div className="mb-8 space-y-4 text-[16px] leading-[1.75] text-muted">
              <p>Changsha Ruijie Machinery Technology Co., Ltd. (“Realjet”, “we”, “us” or “our”) respects your privacy and is committed to handling personal information responsibly and transparently.</p>
              <p>This Privacy Policy explains how we collect, use, store, share and protect personal information when you visit our website, submit a project enquiry or otherwise contact us.</p>
            </div>

            <PolicySection id="who-we-are" title="1. Who We Are">
              <p>The organisation responsible for the personal information described in this Privacy Policy is:</p>
              <ContactCard />
            </PolicySection>

            <PolicySection id="information-we-collect" title="2. Information We Collect">
              <h3 className="font-[850] text-brand-navy">2.1 Information You Provide</h3>
              <p>When you submit a project enquiry or contact us, we may collect:</p>
              <ul>
                <li>your company name;</li>
                <li>your name;</li>
                <li>your country or region;</li>
                <li>your business email address;</li>
                <li>information about your project, such as product type, quantity, target output, schedule, site conditions and project stage;</li>
                <li>the subject or type of your enquiry;</li>
                <li>your acknowledgement that you have read this Privacy Policy;</li>
                <li>any other information you choose to include in your message or later correspondence.</li>
              </ul>
              <p>Please do not submit sensitive personal information that is not necessary for your project enquiry.</p>
              <h3 className="pt-2 font-[850] text-brand-navy">2.2 Technical Information</h3>
              <p>Our website hosting, form-processing, security or email service providers may automatically receive limited technical information when you access or use the website. This may include:</p>
              <ul>
                <li>Internet Protocol (IP) address;</li>
                <li>browser and device type;</li>
                <li>requested page or referring page;</li>
                <li>date and time of access;</li>
                <li>basic security, diagnostic and server-log information.</li>
              </ul>
              <p>With your consent, we use Google Analytics 4 to understand page use and improve the project-enquiry journey. We record pseudonymous usage events such as page views, the location of a selected call-to-action, form progress by field name, submission attempts and submission status. We do not send the values entered in form fields—such as company name, contact name, email address, country or project details—to Google Analytics.</p>
            </PolicySection>

            <PolicySection id="how-we-use-information" title="3. How We Use Personal Information">
              <p>We use personal information to:</p>
              <ul>
                <li>receive, assess and respond to your enquiry;</li>
                <li>understand your production requirements and prepare relevant technical, equipment or commercial information;</li>
                <li>communicate with you about your project;</li>
                <li>arrange technical discussions, quotations, demonstrations or follow-up support;</li>
                <li>maintain records of business communications;</li>
                <li>protect the security and proper operation of our website and enquiry systems;</li>
                <li>comply with legal, regulatory and contractual obligations;</li>
                <li>establish, exercise or defend legal claims;</li>
                <li>improve our website, services and enquiry handling processes using aggregated or non-identifying information where practicable.</li>
              </ul>
              <p>We do not use enquiry information to make decisions based solely on automated processing that produce legal or similarly significant effects.</p>
            </PolicySection>

            <PolicySection id="legal-bases" title="4. Legal Bases">
              <p>Depending on your location and the circumstances, we process personal information on one or more of the following bases:</p>
              <ul>
                <li><strong>Steps requested before entering into a contract or performance of a contract:</strong> when we respond to a project enquiry, prepare a proposal or communicate about a potential or existing project;</li>
                <li><strong>Legitimate interests:</strong> when necessary to operate our business, respond to business enquiries, maintain appropriate records, protect our systems and improve our services, provided that those interests are not overridden by your rights;</li>
                <li><strong>Consent:</strong> when you have given clear consent for a specific purpose and applicable law requires consent;</li>
                <li><strong>Legal obligations:</strong> when processing is necessary to comply with applicable laws, regulations or lawful requests.</li>
              </ul>
              <p>Where we rely on consent, you may withdraw it at any time. Withdrawal does not affect processing that was lawful before consent was withdrawn.</p>
            </PolicySection>

            <PolicySection id="sharing" title="5. When We Share Personal Information">
              <p>We may share personal information only where necessary with:</p>
              <ul>
                <li>authorised Realjet employees involved in sales, engineering, project management, customer support, legal, finance or information technology;</li>
                <li>website hosting, form-processing, email, cloud storage, cybersecurity and other information-technology service providers acting on our behalf;</li>
                <li>professional advisers, auditors, insurers or consultants where reasonably necessary;</li>
                <li>government authorities, regulators, courts or law-enforcement bodies when required by law or to protect legal rights;</li>
                <li>a purchaser, investor or successor organisation in connection with a genuine corporate transaction, subject to appropriate confidentiality and data-protection measures.</li>
              </ul>
              <p>We do not sell personal information.</p>
              <p>Service providers may process information only for the services they provide to us and must protect it in accordance with applicable requirements.</p>
            </PolicySection>

            <PolicySection id="international-transfers" title="6. International Data Transfers">
              <p>Realjet is based in China and serves customers in multiple countries. Information submitted through the website may therefore be processed in China or in other countries where our service providers operate.</p>
              <p>Where applicable law requires safeguards for an international transfer, we will use an appropriate lawful transfer mechanism and reasonable contractual, organisational or technical protections.</p>
              <p>You may contact us for further information about the safeguards relevant to your information.</p>
            </PolicySection>

            <PolicySection id="retention" title="7. How Long We Keep Information">
              <p>We normally retain project enquiry information for up to <strong>24 months after the last substantive interaction</strong> so that we can respond to project developments and maintain an appropriate business record.</p>
              <p>If an enquiry develops into a quotation, contract, project, dispute or legal obligation, relevant information may be kept for a longer period as required by the applicable contract, limitation period, tax, accounting, regulatory or legal requirements.</p>
              <p>Technical and security logs are kept for the period reasonably required for website operation, security and troubleshooting, subject to the settings of the relevant service provider.</p>
              <p>When information is no longer required, we will delete it, anonymise it or securely isolate it, unless continued retention is required by law.</p>
            </PolicySection>

            <PolicySection id="security" title="8. Information Security">
              <p>We use reasonable administrative, technical and organisational measures designed to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.</p>
              <p>No website, email system or Internet transmission can be guaranteed to be completely secure. Please avoid sending confidential technical documents or sensitive personal information through the general enquiry form. We can arrange an appropriate project communication method where necessary.</p>
            </PolicySection>

            <PolicySection id="your-rights" title="9. Your Rights">
              <p>Depending on the laws that apply to you, you may have the right to:</p>
              <ul>
                <li>request confirmation of whether we process your personal information;</li>
                <li>request access to your personal information;</li>
                <li>request correction of inaccurate or incomplete information;</li>
                <li>request deletion of your information;</li>
                <li>request restriction of certain processing;</li>
                <li>object to certain processing based on legitimate interests;</li>
                <li>withdraw consent where processing is based on consent;</li>
                <li>request data portability where applicable;</li>
                <li>request information about recipients or international transfers;</li>
                <li>lodge a complaint with the data-protection authority or other competent regulator in your country or region.</li>
              </ul>
              <p>These rights may be subject to legal conditions and exceptions. To make a request, contact us using the details in Section 1. We may need to verify your identity before completing the request.</p>
            </PolicySection>

            <PolicySection id="cookies" title="10. Cookies and Similar Technologies">
              <p>The website or its hosting provider may use strictly necessary technical functions or security mechanisms required to deliver the page, process an enquiry, prevent abuse or maintain service reliability.</p>
              <p>Google Analytics 4 is an optional analytics service provided by Google. Analytics storage is denied by default and is enabled only after you select “Accept analytics”. Advertising storage, advertising user data and ad personalisation remain disabled.</p>
              <p>You may accept or reject analytics and later change your choice using the analytics settings control. When analytics is accepted, Google may set analytics cookies and process pseudonymous usage information in accordance with its own terms and privacy practices.</p>
              <ul>
                <li>Purpose: measure page use and the effectiveness of the enquiry journey;</li>
                <li>Provider: Google LLC (Google Analytics 4);</li>
                <li>Data: pseudonymous device, browser, page and interaction information—never the contents entered into the enquiry form;</li>
                <li>Control: consent can be granted, refused or withdrawn at any time.</li>
              </ul>
              <button type="button" onClick={openAnalyticsConsentSettings} className="mt-2 inline-flex min-h-10 items-center rounded-lg border border-brand-blue/25 bg-soft px-4 text-[13px] font-[800] text-brand-blue transition hover:border-brand-blue hover:bg-white">Manage analytics preferences</button>
            </PolicySection>

            <PolicySection id="children" title="11. Children’s Information">
              <p>This website and our project enquiry services are intended for business and professional users. They are not directed to children, and we do not knowingly collect personal information from children through the enquiry form.</p>
              <p>If you believe that a child has submitted personal information to us, please contact us so that we can review and delete it where appropriate.</p>
            </PolicySection>

            <PolicySection id="third-party-links" title="12. Third-Party Links">
              <p>Our website may contain links to third-party websites or services. Their privacy practices are governed by their own policies. We are not responsible for the privacy, security or content of third-party websites.</p>
            </PolicySection>

            <PolicySection id="changes" title="13. Changes to This Privacy Policy">
              <p>We may update this Privacy Policy when our website, services, data practices or legal obligations change.</p>
              <p>The revised policy will be published on this page with an updated effective date. Material changes will be highlighted or otherwise communicated where required by applicable law.</p>
            </PolicySection>

            <PolicySection id="contact" title="14. Contact Us">
              <p>For privacy questions, requests or complaints, contact:</p>
              <ContactCard />
              <p>We will review your request and respond within the period required by applicable law.</p>
            </PolicySection>
          </article>
        </div>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. All rights reserved.</span>
          <a href="../../precast-beam-factory/en/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Production Lines</a>
        </div>
      </footer>
    </>
  );
}
