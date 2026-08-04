import { ArrowRight, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";
import { openAnalyticsConsentSettings } from "../../precast-beam-factory/shared/analytics";

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

function goBack() {
  if (document.referrer && window.history.length > 1) window.history.back();
  else window.location.assign("/");
}

export default function App() {
  return (
    <div dir="rtl">
      <header className="sticky top-0 z-30 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
        <div className="site-container flex h-full items-center justify-between gap-5">
          <a href="/" aria-label="الصفحة الرئيسية لـ Realjet">
            <img src={logoImage} alt="شعار Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
          </a>
          <button type="button" onClick={goBack} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white">
            <ArrowRight size={15} aria-hidden="true" />
            <span>عودة</span>
          </button>
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
                <p className="mt-5 text-[12px] font-[750] text-white/55">تاريخ السريان: 1 أغسطس 2026</p>
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
              <p>عند إرسال استفسار عن مشروع أو التواصل معنا، قد نجمع:</p>
              <ul>
                <li>اسم شركتك؛</li>
                <li>اسمك؛</li>
                <li>الدولة أو المنطقة؛</li>
                <li>بريدك الإلكتروني للعمل؛</li>
                <li>معلومات عن مشروعك، مثل نوع المنتج والكمية والإنتاج المستهدف والبرنامج الزمني وظروف الموقع ومرحلة المشروع؛</li>
                <li>موضوع استفسارك أو نوعه؛</li>
                <li>إقرارك بأنك قرأت سياسة الخصوصية هذه؛</li>
                <li>أي معلومات أخرى تختار تضمينها في رسالتك أو مراسلاتك اللاحقة.</li>
              </ul>
              <p>يرجى عدم تقديم معلومات شخصية حساسة لا يحتاجها استفسارك عن المشروع.</p>
              <h3 className="pt-2 font-[850] text-brand-navy">2.2 المعلومات التقنية</h3>
              <p>قد يتلقى مقدمو خدمات استضافة الموقع أو معالجة النماذج أو الأمن أو البريد الإلكتروني معلومات تقنية محدودة تلقائيًا عند دخولك إلى الموقع أو استخدامه، وقد تشمل:</p>
              <ul>
                <li>عنوان بروتوكول الإنترنت (IP)؛</li>
                <li>نوع المتصفح والجهاز؛</li>
                <li>الصفحة المطلوبة أو الصفحة المُحيلة؛</li>
                <li>تاريخ ووقت الدخول؛</li>
                <li>معلومات أساسية من سجلات الخادم والأمن والتشخيص.</li>
              </ul>
              <p>بعد موافقتك، نستخدم Google Analytics 4 لفهم استخدام الصفحة وتحسين مسار استفسار المشروع. نسجل أحداث استخدام بأسماء مستعارة، مثل مشاهدة الصفحة، وموضع زر الإجراء المختار، وتقدم النموذج بحسب اسم الحقل، ومحاولات الإرسال وحالته. ولا نرسل إلى Google Analytics القيم التي تدخلها في النموذج، مثل اسم الشركة أو اسم جهة الاتصال أو البريد الإلكتروني أو البلد أو تفاصيل المشروع.</p>
            </PolicySection>

            <PolicySection id="how-we-use-information" title="3. كيفية استخدام المعلومات الشخصية">
              <p>نستخدم المعلومات الشخصية للأغراض الآتية:</p>
              <ul>
                <li>تلقي استفسارك وتقييمه والرد عليه؛</li>
                <li>فهم متطلبات الإنتاج وإعداد المعلومات الفنية أو المتعلقة بالمعدات أو المعلومات التجارية ذات الصلة؛</li>
                <li>التواصل معك بشأن مشروعك؛</li>
                <li>ترتيب المناقشات الفنية أو عروض الأسعار أو العروض التوضيحية أو دعم المتابعة؛</li>
                <li>الاحتفاظ بسجلات المراسلات التجارية؛</li>
                <li>حماية أمن موقعنا وأنظمة الاستفسار وضمان عملها بصورة سليمة؛</li>
                <li>الوفاء بالالتزامات القانونية والتنظيمية والتعاقدية؛</li>
                <li>إقامة الدعاوى القانونية أو ممارستها أو الدفاع عنها؛</li>
                <li>تحسين موقعنا وخدماتنا وآلية معالجة الاستفسارات باستخدام معلومات مجمعة أو غير محددة للهوية متى كان ذلك ممكنًا.</li>
              </ul>
              <p>لا نتخذ قرارات ذات أثر قانوني أو مماثل اعتمادًا على المعالجة الآلية وحدها.</p>
            </PolicySection>

            <PolicySection id="legal-bases" title="4. الأسس القانونية">
              <p>بحسب موقعك وظروف المعاملة، نعالج المعلومات الشخصية استنادًا إلى أساس أو أكثر مما يأتي:</p>
              <ul>
                <li><strong>الخطوات المطلوبة قبل إبرام عقد أو تنفيذ عقد:</strong> عند الرد على استفسار عن مشروع أو إعداد مقترح أو التواصل بشأن مشروع محتمل أو قائم؛</li>
                <li><strong>المصالح المشروعة:</strong> عند الضرورة لتشغيل أعمالنا والرد على استفسارات الشركات والاحتفاظ بالسجلات المناسبة وحماية أنظمتنا وتحسين خدماتنا، بشرط ألا تتغلب حقوقك على تلك المصالح؛</li>
                <li><strong>الموافقة:</strong> عندما تقدم موافقة واضحة لغرض محدد ويشترط القانون المنطبق الحصول عليها؛</li>
                <li><strong>الالتزامات القانونية:</strong> عندما تكون المعالجة ضرورية للامتثال للقوانين أو اللوائح أو الطلبات المشروعة.</li>
              </ul>
              <p>عند الاعتماد على الموافقة يمكنك سحبها في أي وقت، دون أن يؤثر ذلك في المعالجة المشروعة التي تمت قبل السحب.</p>
            </PolicySection>

            <PolicySection id="sharing" title="5. مشاركة المعلومات الشخصية">
              <p>لا نشارك المعلومات الشخصية إلا عند الضرورة مع:</p>
              <ul>
                <li>موظفي Realjet المخولين المشاركين في المبيعات أو الهندسة أو إدارة المشاريع أو دعم العملاء أو الشؤون القانونية أو المالية أو تقنية المعلومات؛</li>
                <li>مقدمي خدمات استضافة الموقع ومعالجة النماذج والبريد الإلكتروني والتخزين السحابي والأمن السيبراني وغيرها من خدمات تقنية المعلومات الذين يعملون نيابةً عنا؛</li>
                <li>المستشارين المهنيين أو المدققين أو شركات التأمين أو الخبراء عند الضرورة المعقولة؛</li>
                <li>الجهات الحكومية أو التنظيمية أو المحاكم أو جهات إنفاذ القانون عندما يقتضي القانون ذلك أو لحماية الحقوق القانونية؛</li>
                <li>مشتريًا أو مستثمرًا أو جهةً خلفًا في سياق معاملة مؤسسية حقيقية، مع تطبيق تدابير مناسبة للسرية وحماية البيانات.</li>
              </ul>
              <p>لا نبيع المعلومات الشخصية.</p>
              <p>لا يجوز لمقدمي الخدمات معالجة المعلومات إلا لتقديم خدماتهم لنا، وعليهم حمايتها وفق المتطلبات المنطبقة.</p>
            </PolicySection>

            <PolicySection id="international-transfers" title="6. نقل البيانات دوليًا">
              <p>يقع مقر Realjet في الصين وتخدم عملاء في دول متعددة؛ لذلك قد تُعالج المعلومات في الصين أو في دول أخرى يعمل فيها مقدمو خدماتنا.</p>
              <p>عندما يفرض القانون ضمانات للنقل الدولي، نستخدم آلية قانونية مناسبة وإجراءات تعاقدية وتنظيمية وتقنية معقولة.</p>
              <p>يمكنك التواصل معنا للحصول على مزيد من المعلومات عن الضمانات ذات الصلة بمعلوماتك.</p>
            </PolicySection>

            <PolicySection id="retention" title="7. مدة الاحتفاظ بالمعلومات">
              <p>نحتفظ عادةً بمعلومات استفسار المشروع لمدة تصل إلى <strong>24 شهرًا بعد آخر تواصل جوهري</strong> لمتابعة تطور المشروع والاحتفاظ بسجل أعمال مناسب.</p>
              <p>إذا تطور الاستفسار إلى عرض أو عقد أو مشروع أو نزاع، فقد نحتفظ بالمعلومات مدة أطول وفق المتطلبات التعاقدية أو الضريبية أو المحاسبية أو التنظيمية أو القانونية.</p>
              <p>نحتفظ بالسجلات التقنية والأمنية للمدة اللازمة بصورة معقولة لتشغيل الموقع وأمنه واستكشاف الأعطال، وفق إعدادات مقدم الخدمة المعني.</p>
              <p>عندما لا تعود المعلومات مطلوبة، نحذفها أو نخفي هويتها أو نعزلها بصورة آمنة، ما لم يوجب القانون استمرار الاحتفاظ بها.</p>
            </PolicySection>

            <PolicySection id="security" title="8. أمن المعلومات">
              <p>نستخدم إجراءات إدارية وتقنية وتنظيمية معقولة لحماية المعلومات من الوصول غير المصرح به أو الفقد أو سوء الاستخدام أو التغيير أو الإفصاح.</p>
              <p>لا يمكن ضمان أمان أي موقع أو نظام بريد إلكتروني أو نقل عبر الإنترنت بصورة مطلقة؛ لذا تجنب إرسال وثائق تقنية سرية أو معلومات شخصية حساسة عبر نموذج الاستفسار العام. ويمكننا عند الضرورة ترتيب وسيلة مناسبة للتواصل بشأن المشروع.</p>
            </PolicySection>

            <PolicySection id="your-rights" title="9. حقوقك">
              <p>وفق القوانين المنطبقة عليك، قد يحق لك:</p>
              <ul>
                <li>طلب تأكيد ما إذا كنا نعالج معلوماتك الشخصية؛</li>
                <li>طلب الوصول إلى معلوماتك الشخصية؛</li>
                <li>طلب تصحيح المعلومات غير الدقيقة أو غير المكتملة؛</li>
                <li>طلب حذف معلوماتك؛</li>
                <li>طلب تقييد بعض أوجه المعالجة؛</li>
                <li>الاعتراض على بعض أوجه المعالجة القائمة على المصالح المشروعة؛</li>
                <li>سحب الموافقة عندما تستند المعالجة إليها؛</li>
                <li>طلب نقل البيانات حيثما ينطبق ذلك؛</li>
                <li>طلب معلومات عن الجهات المستلمة أو عمليات النقل الدولي؛</li>
                <li>تقديم شكوى إلى هيئة حماية البيانات أو أي جهة تنظيمية مختصة في دولتك أو منطقتك.</li>
              </ul>
              <p>قد تخضع هذه الحقوق لشروط واستثناءات قانونية. ولتقديم طلب، تواصل معنا باستخدام البيانات الواردة في القسم الأول. وقد نطلب التحقق من هويتك قبل تنفيذ الطلب.</p>
            </PolicySection>

            <PolicySection id="cookies" title="10. ملفات تعريف الارتباط والتقنيات المشابهة">
              <p>قد يستخدم الموقع أو مزود الاستضافة وظائف تقنية أو آليات أمن ضرورية لعرض الصفحة ومعالجة الاستفسار ومنع إساءة الاستخدام والمحافظة على موثوقية الخدمة.</p>
              <p>Google Analytics 4 خدمة تحليل اختيارية تقدمها Google. يكون تخزين بيانات التحليلات مرفوضًا افتراضيًا، ولا يُفعّل إلا بعد اختيار «قبول التحليلات». ويظل تخزين الإعلانات وبيانات المستخدم الإعلانية وتخصيص الإعلانات معطّلًا.</p>
              <p>يمكنك قبول التحليلات أو رفضها، ثم تغيير اختيارك في أي وقت من خلال إعدادات التحليلات.</p>
              <ul>
                <li>الغرض: قياس استخدام الصفحة وفعالية مسار الاستفسار؛</li>
                <li>المزود: Google LLC ‏(Google Analytics 4)؛</li>
                <li>البيانات: معلومات بأسماء مستعارة عن الجهاز والمتصفح والصفحة والتفاعل، دون محتوى النموذج؛</li>
                <li>التحكم: يمكن منح الموافقة أو رفضها أو سحبها في أي وقت.</li>
              </ul>
              <button type="button" onClick={openAnalyticsConsentSettings} className="mt-2 inline-flex min-h-10 items-center rounded-lg border border-brand-blue/25 bg-soft px-4 text-[13px] font-[800] text-brand-blue transition hover:border-brand-blue hover:bg-white">إدارة تفضيلات التحليلات</button>
            </PolicySection>

            <PolicySection id="children" title="11. معلومات الأطفال">
              <p>هذا الموقع وخدمات الاستفسار مخصصة للمستخدمين التجاريين والمهنيين، وليست موجهة إلى الأطفال. ولا نجمع عمدًا معلومات شخصية من الأطفال عبر نموذج الاستفسار.</p>
              <p>إذا كنت تعتقد أن طفلًا قدم إلينا معلومات شخصية، فيرجى التواصل معنا حتى نتمكن من مراجعتها وحذفها عند الاقتضاء.</p>
            </PolicySection>

            <PolicySection id="third-party-links" title="12. روابط الجهات الخارجية">
              <p>قد يحتوي الموقع على روابط لمواقع أو خدمات تابعة لجهات خارجية، وتخضع ممارسات الخصوصية فيها لسياساتها الخاصة. ولسنا مسؤولين عن خصوصية تلك المواقع أو أمنها أو محتواها.</p>
            </PolicySection>

            <PolicySection id="changes" title="13. التغييرات على سياسة الخصوصية">
              <p>قد نحدّث هذه السياسة عندما يتغير الموقع أو خدماتنا أو ممارسات البيانات أو الالتزامات القانونية. وستُنشر النسخة المعدلة في هذه الصفحة مع تاريخ سريان محدث.</p>
              <p>سنبرز التغييرات الجوهرية أو نبلغ عنها بوسيلة أخرى عندما يقتضي القانون المنطبق ذلك.</p>
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
