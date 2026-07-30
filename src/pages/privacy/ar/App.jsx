import { ArrowRight, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";

const sections = [
  ["who-we-are", "1. من نحن"],
  ["information-we-collect", "2. المعلومات التي نجمعها"],
  ["how-we-use-information", "3. كيفية استخدام المعلومات الشخصية"],
  ["legal-bases", "4. الأسس القانونية"],
  ["sharing", "5. مشاركة المعلومات الشخصية"],
  ["international-transfers", "6. نقل البيانات دوليًا"],
  ["retention", "7. مدة الاحتفاظ بالمعلومات"],
  ["security", "8. أمن المعلومات"],
  ["your-rights", "9. حقوقك"],
  ["cookies", "10. ملفات تعريف الارتباط والتقنيات المشابهة"],
  ["children", "11. معلومات الأطفال"],
  ["third-party-links", "12. روابط الجهات الخارجية"],
  ["changes", "13. التغييرات على سياسة الخصوصية"],
  ["contact", "14. تواصل معنا"],
];

function PolicySection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-[clamp(21px,2.3vw,28px)] font-[850] tracking-[-0.025em] text-brand-navy">{title}</h2>
      <div className="policy-copy mt-4 space-y-3 text-[15px] leading-[1.75] text-muted">{children}</div>
    </section>
  );
}

function ContactCard() {
  return (
    <div className="mt-5 rounded-card border border-brand-blue/15 bg-soft p-5">
      <strong className="block text-[16px] font-[850] text-brand-navy" dir="ltr">Changsha Ruijie Machinery Technology Co., Ltd.</strong>
      <div className="mt-4 grid gap-3 text-[14px]">
        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 shrink-0 text-brand-blue" size={17} aria-hidden="true" />
          <span>رقم 48، منطقة جينتشو الجديدة (منطقة جينتشو للتنمية)، نينغشيانغ، تشانغشا، هونان، الصين</span>
        </div>
        <a href="mailto:loyosun@gmail.com" dir="ltr" className="flex items-center justify-end gap-2.5 font-[750] text-brand-blue underline decoration-brand-blue/25 underline-offset-3 hover:text-brand-navy">
          <Mail size={17} aria-hidden="true" />
          loyosun@gmail.com
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div dir="rtl">
      <header className="sticky top-0 z-30 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
        <div className="site-container flex h-full items-center justify-between gap-5">
          <a href="../../precast-beam-factory/ar/" aria-label="خطوط إنتاج Realjet للخرسانة مسبقة الصب">
            <img src={logoImage} alt="شعار Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
          </a>
          <a href="../../precast-beam-factory/ar/" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white">
            <ArrowRight size={15} aria-hidden="true" />
            <span className="max-[430px]:hidden">العودة إلى خطوط الإنتاج</span>
            <span className="hidden max-[430px]:inline">عودة</span>
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
                <p className="text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">حماية البيانات</p>
                <h1 className="mt-2 text-[clamp(36px,5vw,56px)] leading-[1.08] font-[900] tracking-[-0.04em]">سياسة الخصوصية</h1>
                <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-white/72 max-[720px]:text-[15px]">
                  توضح هذه السياسة كيفية جمع Realjet للمعلومات الشخصية المقدمة عبر موقعنا ونماذج الاستفسار عن المشاريع واستخدامها وحفظها ومشاركتها وحمايتها.
                </p>
                <p className="mt-5 text-[12px] font-[750] text-white/55">تاريخ السريان: 30 يوليو 2026</p>
              </div>
            </div>
          </div>
        </section>

        <div className="site-container grid grid-cols-[250px_minmax(0,1fr)] gap-12 py-16 max-[1000px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:py-10">
          <aside className="max-[1000px]:order-2">
            <nav aria-label="محتويات سياسة الخصوصية" className="sticky top-24 rounded-card border border-line bg-soft p-5 max-[1000px]:static">
              <strong className="text-[13px] font-[850] tracking-[0.06em] text-brand-blue uppercase">في هذه الصفحة</strong>
              <ol className="mt-3 grid gap-1.5">
                {sections.map(([id, title]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="block rounded-md px-2 py-1.5 text-[12px] leading-[1.35] text-muted transition hover:bg-white hover:text-brand-navy">{title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[830px]">
            <div className="mb-8 space-y-4 text-[16px] leading-[1.75] text-muted">
              <p>تحترم شركة <span dir="ltr">Changsha Ruijie Machinery Technology Co., Ltd.</span>، ويشار إليها باسم “Realjet” أو “نحن”، خصوصيتك وتلتزم بالتعامل مع المعلومات الشخصية بمسؤولية وشفافية.</p>
              <p>تسري هذه السياسة عند زيارة موقعنا أو إرسال استفسار عن مشروع أو التواصل معنا بأي وسيلة أخرى.</p>
            </div>

            <PolicySection id="who-we-are" title="1. من نحن">
              <p>الجهة المسؤولة عن المعلومات الشخصية الموضحة في هذه السياسة هي:</p>
              <ContactCard />
            </PolicySection>

            <PolicySection id="information-we-collect" title="2. المعلومات التي نجمعها">
              <h3 className="font-[850] text-brand-navy">2.1 المعلومات التي تقدمها</h3>
              <p>عند إرسال استفسار أو التواصل معنا، قد نجمع اسم الشركة واسمك والدولة أو المنطقة والبريد الإلكتروني للعمل وتفاصيل المشروع وموضوع الاستفسار وأي معلومات أخرى تختار تقديمها.</p>
              <p>قد تشمل تفاصيل المشروع نوع المنتج والكمية والقدرة المستهدفة والبرنامج الزمني وظروف الموقع ومرحلة المشروع.</p>
              <p>يرجى عدم إرسال معلومات شخصية حساسة لا يحتاجها استفسارك.</p>
              <h3 className="pt-2 font-[850] text-brand-navy">2.2 المعلومات التقنية</h3>
              <p>قد يتلقى مقدمو خدمات الاستضافة أو معالجة النماذج أو الأمن معلومات تقنية محدودة، مثل عنوان IP ونوع المتصفح والجهاز والصفحة المطلوبة وتاريخ ووقت الوصول وسجلات الأمن والتشخيص.</p>
              <p>لا يستخدم الموقع حاليًا وحدات تتبع إعلانية أو تحليلات. وإذا أضفناها مستقبلًا فسنحدّث هذه السياسة ونوفر آلية الموافقة المطلوبة قبل تفعيلها.</p>
            </PolicySection>

            <PolicySection id="how-we-use-information" title="3. كيفية استخدام المعلومات الشخصية">
              <p>نستخدم المعلومات لتلقي الاستفسارات وتقييمها والرد عليها، وفهم متطلبات الإنتاج، وإعداد المعلومات الفنية أو التجارية ذات الصلة، والتواصل بشأن المشروع، وترتيب العروض والمناقشات والمتابعة، وحماية الموقع، والوفاء بالالتزامات القانونية والتعاقدية.</p>
              <p>لا نتخذ قرارات ذات أثر قانوني أو مماثل اعتمادًا على المعالجة الآلية وحدها.</p>
            </PolicySection>

            <PolicySection id="legal-bases" title="4. الأسس القانونية">
              <p>وفق موقعك وظروف المعاملة، نعالج المعلومات لتنفيذ خطوات مطلوبة قبل التعاقد أو لتنفيذ عقد، أو استنادًا إلى مصالح مشروعة في تشغيل أعمالنا والرد على الاستفسارات، أو بموافقتك، أو للوفاء بالتزامات قانونية.</p>
              <p>عند الاعتماد على الموافقة يمكنك سحبها في أي وقت، دون أن يؤثر ذلك في المعالجة المشروعة التي تمت قبل السحب.</p>
            </PolicySection>

            <PolicySection id="sharing" title="5. مشاركة المعلومات الشخصية">
              <p>قد نشارك المعلومات عند الضرورة مع موظفي Realjet المخولين، ومقدمي خدمات الموقع والبريد والتخزين والأمن، والمستشارين والمدققين وشركات التأمين، والجهات الحكومية أو القضائية عندما يقتضي القانون ذلك، أو في معاملة مؤسسية حقيقية مع تطبيق ضمانات مناسبة.</p>
              <p>لا نبيع المعلومات الشخصية، ولا يجوز لمقدمي الخدمة استخدامها إلا لتقديم الخدمات المتفق عليها.</p>
            </PolicySection>

            <PolicySection id="international-transfers" title="6. نقل البيانات دوليًا">
              <p>يقع مقر Realjet في الصين وتخدم عملاء في دول متعددة؛ لذلك قد تُعالج المعلومات في الصين أو في دول أخرى يعمل فيها مقدمو خدماتنا.</p>
              <p>عندما يفرض القانون ضمانات للنقل الدولي، نستخدم آلية قانونية مناسبة وإجراءات تعاقدية وتنظيمية وتقنية معقولة.</p>
            </PolicySection>

            <PolicySection id="retention" title="7. مدة الاحتفاظ بالمعلومات">
              <p>نحتفظ عادةً بمعلومات استفسار المشروع لمدة تصل إلى <strong>24 شهرًا بعد آخر تواصل جوهري</strong> لمتابعة تطور المشروع والاحتفاظ بسجل أعمال مناسب.</p>
              <p>إذا تطور الاستفسار إلى عرض أو عقد أو مشروع أو نزاع، فقد نحتفظ بالمعلومات مدة أطول وفق المتطلبات التعاقدية أو الضريبية أو المحاسبية أو التنظيمية أو القانونية.</p>
            </PolicySection>

            <PolicySection id="security" title="8. أمن المعلومات">
              <p>نستخدم إجراءات إدارية وتقنية وتنظيمية معقولة لحماية المعلومات من الوصول غير المصرح به أو الفقد أو سوء الاستخدام أو التغيير أو الإفصاح.</p>
              <p>لا يمكن ضمان أمان أي موقع أو بريد إلكتروني بصورة مطلقة؛ لذا تجنب إرسال وثائق تقنية سرية أو معلومات شخصية حساسة عبر نموذج الاستفسار العام.</p>
            </PolicySection>

            <PolicySection id="your-rights" title="9. حقوقك">
              <p>وفق القانون المنطبق، قد يحق لك طلب الوصول إلى معلوماتك أو تصحيحها أو حذفها أو تقييد معالجتها، أو الاعتراض على بعض أوجه المعالجة، أو سحب الموافقة، أو طلب نقل البيانات، أو معرفة الجهات المستلمة وعمليات النقل الدولي، أو تقديم شكوى إلى الجهة المختصة.</p>
              <p>قد تخضع هذه الحقوق لشروط واستثناءات قانونية. وقد نطلب التحقق من هويتك قبل تنفيذ الطلب.</p>
            </PolicySection>

            <PolicySection id="cookies" title="10. ملفات تعريف الارتباط والتقنيات المشابهة">
              <p>لا يستخدم الموقع حاليًا ملفات تعريف ارتباط إعلانية أو وحدات بكسل إعلانية أو أدوات تحليل.</p>
              <p>قد يستخدم الموقع أو مزود الاستضافة وظائف تقنية أو آليات أمن ضرورية لعرض الصفحة ومعالجة الاستفسار ومنع إساءة الاستخدام والمحافظة على موثوقية الخدمة.</p>
            </PolicySection>

            <PolicySection id="children" title="11. معلومات الأطفال">
              <p>هذا الموقع وخدمات الاستفسار مخصصة للمستخدمين التجاريين والمهنيين، وليست موجهة إلى الأطفال. ولا نجمع عمدًا معلومات شخصية من الأطفال عبر نموذج الاستفسار.</p>
            </PolicySection>

            <PolicySection id="third-party-links" title="12. روابط الجهات الخارجية">
              <p>قد يحتوي الموقع على روابط لمواقع أو خدمات تابعة لجهات خارجية، وتخضع ممارسات الخصوصية فيها لسياساتها الخاصة. ولسنا مسؤولين عن خصوصية تلك المواقع أو أمنها أو محتواها.</p>
            </PolicySection>

            <PolicySection id="changes" title="13. التغييرات على سياسة الخصوصية">
              <p>قد نحدّث هذه السياسة عندما يتغير الموقع أو خدماتنا أو ممارسات البيانات أو الالتزامات القانونية. وستُنشر النسخة المعدلة في هذه الصفحة مع تاريخ سريان محدث.</p>
            </PolicySection>

            <PolicySection id="contact" title="14. تواصل معنا">
              <p>للاستفسارات أو الطلبات أو الشكاوى المتعلقة بالخصوصية، تواصل معنا عبر:</p>
              <ContactCard />
              <p>سنراجع طلبك ونرد خلال المدة التي يحددها القانون المنطبق.</p>
            </PolicySection>
          </article>
        </div>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. جميع الحقوق محفوظة.</span>
          <a href="../../precast-beam-factory/ar/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">خطوط الإنتاج</a>
        </div>
      </footer>
    </div>
  );
}
