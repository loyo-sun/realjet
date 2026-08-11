import { ArrowLeft, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";
import AnalyticsPreferenceSwitch from "../shared/AnalyticsPreferenceSwitch";

const sections = [
  ["who-we-are", "1. 关于我们"],
  ["information-we-collect", "2. 我们收集的信息"],
  ["how-we-use-information", "3. 个人信息的使用方式"],
  ["legal-bases", "4. 处理个人信息的法律依据"],
  ["sharing", "5. 个人信息的共享"],
  ["international-transfers", "6. 跨境传输"],
  ["retention", "7. 信息保存期限"],
  ["security", "8. 信息安全"],
  ["your-rights", "9. 您的权利"],
  ["cookies", "10. Cookie 与类似技术"],
  ["children", "11. 未成年人信息"],
  ["third-party-links", "12. 第三方链接"],
  ["changes", "13. 隐私政策的变更"],
  ["contact", "14. 联系我们"],
];

function PolicySection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-[clamp(21px,2.2vw,26px)] leading-[1.25] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h2>
      <div className="policy-copy mt-4 space-y-4 text-[15px] leading-[1.85] text-muted">{children}</div>
    </section>
  );
}

function ContactCard() {
  return (
    <div className="mt-5 rounded-card border border-brand-blue/15 bg-soft p-5">
      <strong className="block text-[16px] font-[850] text-brand-navy">长沙瑞捷机械科技股份有限公司</strong>
      <div className="mt-4 grid gap-3 text-[14px]">
        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 shrink-0 text-brand-blue" size={17} aria-hidden="true" />
          <span>中国湖南省长沙市宁乡市金洲新区（金洲开发区）48号</span>
        </div>
        <a href="mailto:sales@realjetech.com" className="flex items-center gap-2.5 font-[750] text-brand-blue underline decoration-brand-blue/25 underline-offset-3 hover:text-brand-navy">
          <Mail size={17} aria-hidden="true" />
          sales@realjetech.com
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
    <>
      <header className="sticky top-0 z-30 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
        <div className="site-container flex h-full items-center justify-between gap-5">
          <a href="/" aria-label="瑞捷首页">
            <img src={logoImage} alt="瑞捷机械标志" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
          </a>
          <button type="button" onClick={goBack} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>返回</span>
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
                <p className="text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">个人信息保护</p>
                <h1 className="mt-2 text-[clamp(36px,5vw,56px)] leading-[1.08] font-[900] tracking-[-0.04em]">隐私政策</h1>
                <p className="mt-5 max-w-[760px] text-[17px] leading-[1.8] text-white/72 max-[720px]:text-[15px]">
                  本政策说明瑞捷如何收集、使用、保存、共享和保护您通过本网站及项目询盘表单提交的个人信息。
                </p>
                <p className="mt-5 text-[12px] font-[750] text-white/55">生效日期：2026年8月1日</p>
              </div>
            </div>
          </div>
        </section>

        <div className="site-container grid grid-cols-[250px_minmax(0,1fr)] gap-12 py-16 max-[1000px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:py-10">
          <aside className="max-[1000px]:order-2">
            <nav aria-label="隐私政策目录" className="sticky top-24 rounded-card border border-line bg-soft p-5 max-[1000px]:static">
              <strong className="text-[13px] font-[850] tracking-[0.06em] text-brand-blue uppercase">本页目录</strong>
              <ol className="mt-3 grid gap-1.5">
                {sections.map(([id, title]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="block rounded-md px-2 py-1.5 text-[12px] leading-[1.45] text-muted transition hover:bg-white hover:text-brand-navy">
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[830px]">
            <div className="mb-8 space-y-4 text-[16px] leading-[1.85] text-muted">
              <p>长沙瑞捷机械科技股份有限公司（以下简称“瑞捷”“我们”）尊重您的隐私，并承诺以负责任、透明的方式处理个人信息。</p>
              <p>本隐私政策说明您访问我们的网站、提交项目询盘或通过其他方式联系我们时，我们如何收集、使用、保存、共享和保护您的个人信息。</p>
            </div>

            <PolicySection id="who-we-are" title="1. 关于我们">
              <p>负责处理本隐私政策所述个人信息的主体为：</p>
              <ContactCard />
            </PolicySection>

            <PolicySection id="information-we-collect" title="2. 我们收集的信息">
              <h3 className="font-[850] text-brand-navy">2.1 您主动提供的信息</h3>
              <p>当您提交项目询盘或联系我们时，我们可能收集：</p>
              <ul>
                <li>公司名称；</li>
                <li>您的姓名；</li>
                <li>所在国家或地区；</li>
                <li>商务电子邮箱；</li>
                <li>项目相关信息，例如产品类型、数量、目标产能、进度计划、场地条件及项目阶段；</li>
                <li>询盘主题或类型；</li>
                <li>您已阅读本隐私政策的确认信息；</li>
                <li>您选择在留言或后续沟通中提供的其他信息。</li>
              </ul>
              <p>请勿提交与项目询盘无关的敏感个人信息。</p>
              <h3 className="pt-2 font-[850] text-brand-navy">2.2 技术信息</h3>
              <p>当您访问或使用本网站时，网站托管、表单处理、安全或电子邮件服务提供商可能自动接收有限的技术信息，包括：</p>
              <ul>
                <li>互联网协议地址（IP 地址）；</li>
                <li>浏览器及设备类型；</li>
                <li>访问的页面或来源页面；</li>
                <li>访问日期和时间；</li>
                <li>基本的安全、诊断及服务器日志信息。</li>
              </ul>
              <p>在取得您的同意后，我们使用 Google Analytics 4 了解页面使用情况并改进项目询盘流程。我们记录经过假名化处理的使用事件，例如页面浏览、所点击询盘按钮的位置、按字段名称统计的表单填写进度、提交尝试和提交状态。我们不会将表单中填写的具体内容——例如公司名称、联系人姓名、电子邮箱、国家或项目详情——发送至 Google Analytics。</p>
            </PolicySection>

            <PolicySection id="how-we-use-information" title="3. 个人信息的使用方式">
              <p>我们可能将个人信息用于：</p>
              <ul>
                <li>接收、评估并回复您的询盘；</li>
                <li>了解您的生产需求，并准备相关技术、设备或商务资料；</li>
                <li>就您的项目与您沟通；</li>
                <li>安排技术交流、报价、演示或后续支持；</li>
                <li>保存商务沟通记录；</li>
                <li>保障网站及询盘系统的安全和正常运行；</li>
                <li>履行法律、监管及合同义务；</li>
                <li>提出、行使或维护法律权利；</li>
                <li>在可行情况下，使用汇总或无法识别个人身份的信息改进网站、服务和询盘处理流程。</li>
              </ul>
              <p>我们不会仅基于自动化处理询盘信息，作出对您产生法律影响或类似重大影响的决定。</p>
            </PolicySection>

            <PolicySection id="legal-bases" title="4. 处理个人信息的法律依据">
              <p>根据您所在地区及具体情况，我们可能基于以下一项或多项依据处理个人信息：</p>
              <ul>
                <li><strong>订立合同前按您的要求采取措施或履行合同：</strong>用于回复项目询盘、准备方案，或就潜在及现有项目进行沟通；</li>
                <li><strong>合法利益：</strong>在不损害您权利的前提下，为开展业务、回复商务询盘、保存适当记录、保护系统及改进服务而进行必要处理；</li>
                <li><strong>同意：</strong>当您已就特定目的作出明确同意，且适用法律要求取得同意时；</li>
                <li><strong>法定义务：</strong>为遵守适用法律法规或合法要求而进行必要处理。</li>
              </ul>
              <p>当处理以同意为依据时，您可以随时撤回同意。撤回同意不影响撤回前基于同意进行处理的合法性。</p>
            </PolicySection>

            <PolicySection id="sharing" title="5. 个人信息的共享">
              <p>仅在必要情况下，我们可能与以下主体共享个人信息：</p>
              <ul>
                <li>参与销售、工程、项目管理、客户支持、法务、财务或信息技术工作的瑞捷授权员工；</li>
                <li>代表我们提供网站托管、表单处理、电子邮件、云存储、网络安全及其他信息技术服务的服务提供商；</li>
                <li>在合理必要范围内的专业顾问、审计机构、保险机构或咨询机构；</li>
                <li>依法提出要求或为保护合法权利所必需的政府部门、监管机构、法院或执法机关；</li>
                <li>在真实企业交易中涉及的收购方、投资方或承继机构，并采取适当的保密和数据保护措施。</li>
              </ul>
              <p>我们不会出售个人信息。</p>
              <p>服务提供商只能为向我们提供相关服务而处理信息，并须按照适用要求保护信息。</p>
            </PolicySection>

            <PolicySection id="international-transfers" title="6. 跨境传输">
              <p>瑞捷位于中国，并为多个国家和地区的客户提供服务。因此，通过网站提交的信息可能在中国或我们的服务提供商运营所在的其他国家和地区进行处理。</p>
              <p>当适用法律要求为跨境传输提供保障时，我们将采用适当的合法传输机制，并采取合理的合同、组织或技术保护措施。</p>
              <p>您可以联系我们，进一步了解与您的信息相关的保护措施。</p>
            </PolicySection>

            <PolicySection id="retention" title="7. 信息保存期限">
              <p>通常情况下，我们会在<strong>最后一次实质性互动后保存项目询盘信息不超过24个月</strong>，以便跟进项目进展并保留适当的商务记录。</p>
              <p>如果询盘进一步形成报价、合同、项目、争议或法定义务，相关信息可能根据适用合同、诉讼时效、税务、会计、监管或法律要求保存更长时间。</p>
              <p>技术和安全日志将在网站运行、安全保障及故障排查所合理需要的期限内保存，并受相关服务提供商设置的限制。</p>
              <p>信息不再需要时，我们将删除、匿名化或安全隔离相关信息，但法律要求继续保存的除外。</p>
            </PolicySection>

            <PolicySection id="security" title="8. 信息安全">
              <p>我们采取合理的管理、技术和组织措施，旨在防止个人信息遭到未经授权的访问、丢失、滥用、篡改或披露。</p>
              <p>任何网站、电子邮件系统或互联网传输都无法保证绝对安全。请勿通过通用询盘表单发送机密技术文件或敏感个人信息。如有需要，我们可以另行安排适合项目沟通的方式。</p>
            </PolicySection>

            <PolicySection id="your-rights" title="9. 您的权利">
              <p>根据适用于您的法律，您可能有权：</p>
              <ul>
                <li>确认我们是否处理您的个人信息；</li>
                <li>请求访问您的个人信息；</li>
                <li>请求更正不准确或不完整的信息；</li>
                <li>请求删除您的信息；</li>
                <li>请求限制特定处理活动；</li>
                <li>反对基于合法利益进行的特定处理；</li>
                <li>在处理基于同意时撤回同意；</li>
                <li>在适用情况下请求数据可携带；</li>
                <li>请求了解信息接收方或跨境传输情况；</li>
                <li>向您所在国家或地区的数据保护机构或其他主管监管机构提出投诉。</li>
              </ul>
              <p>上述权利可能受法律条件及例外情形限制。如需提出请求，请使用第1节中的联系方式与我们联系。处理请求前，我们可能需要核实您的身份。</p>
            </PolicySection>

            <PolicySection id="cookies" title="10. Cookie 与类似技术">
              <p>本网站或其托管服务提供商可能使用展示页面、处理询盘、防止滥用或维持服务可靠性所必需的技术功能或安全机制。</p>
              <p>Google Analytics 4 是由 Google 提供的可选分析服务。当您选择“全部接受”或保持下方分析统计开关开启时，分析数据存储将被启用；您可随时将其关闭。广告数据存储、广告用户数据及广告个性化功能始终保持关闭。</p>
              <p>您可以接受或拒绝分析统计，并可通过“统计设置”随时更改选择。同意分析统计后，Google 可能设置分析 Cookie，并按照其自身条款及隐私规则处理经过假名化的使用信息。</p>
              <ul>
                <li>目的：衡量页面使用情况及询盘流程的有效性；</li>
                <li>服务提供商：Google LLC（Google Analytics 4）；</li>
                <li>数据：经过假名化的设备、浏览器、页面和交互信息，不包括询盘表单中填写的具体内容；</li>
                <li>控制方式：您可以随时同意、拒绝或撤回同意。</li>
              </ul>
              <AnalyticsPreferenceSwitch label="管理统计设置" onLabel="分析统计已开启" offLabel="分析统计已关闭" />
            </PolicySection>

            <PolicySection id="children" title="11. 未成年人信息">
              <p>本网站及项目询盘服务面向企业和专业用户，并非面向未成年人。我们不会通过询盘表单故意收集未成年人的个人信息。</p>
              <p>如果您认为有未成年人向我们提交了个人信息，请联系我们，以便我们核查并在适当情况下予以删除。</p>
            </PolicySection>

            <PolicySection id="third-party-links" title="12. 第三方链接">
              <p>本网站可能包含指向第三方网站或服务的链接。第三方的隐私处理方式受其自身政策约束，我们不对第三方网站的隐私、安全或内容负责。</p>
            </PolicySection>

            <PolicySection id="changes" title="13. 隐私政策的变更">
              <p>当网站、服务、数据处理方式或法律义务发生变化时，我们可能更新本隐私政策。</p>
              <p>修订后的政策将在本页面发布，并注明新的生效日期。适用法律要求时，我们会突出显示或通过其他方式告知重大变更。</p>
            </PolicySection>

            <PolicySection id="contact" title="14. 联系我们">
              <p>如有隐私相关问题、请求或投诉，请联系：</p>
              <ContactCard />
              <p>我们将核查您的请求，并在适用法律规定的期限内作出回复。</p>
            </PolicySection>
          </article>
        </div>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 长沙瑞捷机械科技股份有限公司 版权所有。</span>
          <a href="../../precast-beam-factory/cn/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">预制构件生产线</a>
        </div>
      </footer>
    </>
  );
}
