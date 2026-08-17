import { ArrowLeft, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";
import AnalyticsPreferenceSwitch from "../shared/AnalyticsPreferenceSwitch";

const sections = [
  ["who-we-are", "1. Quiénes somos"],
  ["information-we-collect", "2. Información que recopilamos"],
  ["how-we-use-information", "3. Cómo utilizamos los datos personales"],
  ["legal-bases", "4. Bases jurídicas"],
  ["sharing", "5. Cuándo compartimos datos personales"],
  ["international-transfers", "6. Transferencias internacionales de datos"],
  ["retention", "7. Plazo de conservación"],
  ["security", "8. Seguridad de la información"],
  ["your-rights", "9. Sus derechos"],
  ["cookies", "10. Cookies y tecnologías similares"],
  ["children", "11. Datos de menores"],
  ["third-party-links", "12. Enlaces de terceros"],
  ["changes", "13. Cambios en esta política de privacidad"],
  ["contact", "14. Contacto"],
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
          <span>N.º 48, Nuevo Distrito de Jinzhou (Zona de Desarrollo de Jinzhou), Ningxiang, Changsha, Hunan, China</span>
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
          <a href="/" aria-label="Inicio de Realjet">
            <img src={logoImage} alt="Logotipo de Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
          </a>
          <button type="button" onClick={goBack} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Volver</span>
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
                <p className="text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Protección de datos</p>
                <h1 className="mt-2 text-[clamp(36px,5vw,56px)] leading-[1.08] font-[900] tracking-[-0.04em]">Política de privacidad</h1>
                <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-white/72 max-[720px]:text-[15px]">
                  Esta política explica cómo Realjet recopila, utiliza, conserva, comparte y protege los datos personales enviados a través de nuestro sitio web y de los formularios de consulta de proyectos.
                </p>
                <p className="mt-5 text-[12px] font-[750] text-white/55">Fecha de entrada en vigor: 1 de agosto de 2026</p>
              </div>
            </div>
          </div>
        </section>

        <div className="site-container grid grid-cols-[250px_minmax(0,1fr)] gap-12 py-16 max-[1000px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:py-10">
          <aside className="max-[1000px]:order-2">
            <nav aria-label="Contenido de la política de privacidad" className="sticky top-24 rounded-card border border-line bg-soft p-5 max-[1000px]:static">
              <strong className="text-[13px] font-[850] tracking-[0.06em] text-brand-blue uppercase">En esta página</strong>
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
              <p>Changsha Ruijie Machinery Technology Co., Ltd. («Realjet», «nosotros» o «nuestro») respeta su privacidad y se compromete a tratar los datos personales de forma responsable y transparente.</p>
              <p>Esta Política de privacidad explica cómo recopilamos, utilizamos, conservamos, compartimos y protegemos los datos personales cuando visita nuestro sitio web, envía una consulta de proyecto o se pone en contacto con nosotros.</p>
            </div>

            <PolicySection id="who-we-are" title="1. Quiénes somos">
              <p>La entidad responsable del tratamiento de los datos personales descritos en esta Política de privacidad es:</p>
              <ContactCard />
            </PolicySection>

            <PolicySection id="information-we-collect" title="2. Información que recopilamos">
              <h3 className="font-[850] text-brand-navy">2.1 Información que nos facilita</h3>
              <p>Cuando envía una consulta de proyecto o se pone en contacto con nosotros, podemos recopilar:</p>
              <ul>
                <li>el nombre de su empresa;</li>
                <li>su nombre;</li>
                <li>su país o región;</li>
                <li>su dirección de correo electrónico profesional;</li>
                <li>información sobre su proyecto, como el tipo de producto, la cantidad, la producción objetivo, el calendario, las condiciones del emplazamiento y la fase del proyecto;</li>
                <li>el asunto o tipo de consulta;</li>
                <li>la confirmación de que ha leído esta Política de privacidad;</li>
                <li>cualquier otra información que decida incluir en su mensaje o en comunicaciones posteriores.</li>
              </ul>
              <p>No envíe datos personales sensibles que no sean necesarios para su consulta de proyecto.</p>
              <h3 className="pt-2 font-[850] text-brand-navy">2.2 Información técnica</h3>
              <p>Nuestros proveedores de alojamiento web, procesamiento de formularios, seguridad o correo electrónico pueden recibir automáticamente información técnica limitada cuando accede o utiliza el sitio web. Esta puede incluir:</p>
              <ul>
                <li>dirección del Protocolo de Internet (IP);</li>
                <li>tipo de navegador y dispositivo;</li>
                <li>página solicitada o página de procedencia;</li>
                <li>fecha y hora de acceso;</li>
                <li>información básica de seguridad, diagnóstico y registros del servidor.</li>
              </ul>
              <p>Con su consentimiento, utilizamos Google Analytics 4 para conocer el uso de la página y mejorar el recorrido de consulta de proyectos. Registramos eventos de uso seudonimizados, como la visualización de la página, la ubicación del botón de llamada a la acción seleccionado, el progreso del formulario por nombre de campo, los intentos de envío y su resultado. Los valores introducidos en el formulario —incluidos empresa, nombre de contacto, correo electrónico, país y detalles del proyecto— no se envían a Google Analytics.</p>
            </PolicySection>

            <PolicySection id="how-we-use-information" title="3. Cómo utilizamos los datos personales">
              <p>Utilizamos los datos personales para:</p>
              <ul>
                <li>recibir, evaluar y responder a su consulta;</li>
                <li>comprender sus requisitos de producción y preparar información técnica, comercial o sobre equipos que resulte pertinente;</li>
                <li>comunicarnos con usted acerca de su proyecto;</li>
                <li>organizar conversaciones técnicas, presupuestos, demostraciones o asistencia posterior;</li>
                <li>mantener registros de las comunicaciones comerciales;</li>
                <li>proteger la seguridad y el correcto funcionamiento de nuestro sitio web y sistemas de consulta;</li>
                <li>cumplir obligaciones legales, reglamentarias y contractuales;</li>
                <li>formular, ejercer o defender reclamaciones legales;</li>
                <li>mejorar nuestro sitio web, servicios y procesos de gestión de consultas utilizando, cuando sea posible, información agregada o no identificativa.</li>
              </ul>
              <p>No utilizamos la información de las consultas para tomar decisiones basadas exclusivamente en tratamientos automatizados que produzcan efectos jurídicos o de importancia similar.</p>
            </PolicySection>

            <PolicySection id="legal-bases" title="4. Bases jurídicas">
              <p>Según su ubicación y las circunstancias, tratamos los datos personales sobre una o varias de las siguientes bases jurídicas:</p>
              <ul>
                <li><strong>Medidas precontractuales solicitadas o ejecución de un contrato:</strong> cuando respondemos a una consulta, preparamos una propuesta o nos comunicamos sobre un proyecto potencial o existente;</li>
                <li><strong>Intereses legítimos:</strong> cuando sea necesario para gestionar nuestra actividad, responder a consultas comerciales, mantener registros adecuados, proteger nuestros sistemas y mejorar nuestros servicios, siempre que sus derechos no prevalezcan sobre dichos intereses;</li>
                <li><strong>Consentimiento:</strong> cuando haya dado un consentimiento claro para una finalidad específica y la legislación aplicable lo exija;</li>
                <li><strong>Obligaciones legales:</strong> cuando el tratamiento sea necesario para cumplir leyes, reglamentos o requerimientos lícitos aplicables.</li>
              </ul>
              <p>Cuando el tratamiento se base en el consentimiento, podrá retirarlo en cualquier momento. La retirada no afectará a la licitud del tratamiento realizado con anterioridad.</p>
            </PolicySection>

            <PolicySection id="sharing" title="5. Cuándo compartimos datos personales">
              <p>Podemos compartir datos personales, únicamente cuando sea necesario, con:</p>
              <ul>
                <li>personal autorizado de Realjet de las áreas comercial, ingeniería, gestión de proyectos, atención al cliente, jurídica, financiera o de tecnologías de la información;</li>
                <li>proveedores de alojamiento web, procesamiento de formularios, correo electrónico, almacenamiento en la nube, ciberseguridad y otros servicios tecnológicos que actúen por cuenta nuestra;</li>
                <li>asesores profesionales, auditores, aseguradoras o consultores cuando sea razonablemente necesario;</li>
                <li>autoridades públicas, reguladores, tribunales u organismos policiales cuando lo exija la ley o sea necesario para proteger derechos legales;</li>
                <li>un comprador, inversor u organización sucesora en relación con una operación societaria real, sujeta a medidas adecuadas de confidencialidad y protección de datos.</li>
              </ul>
              <p>No vendemos datos personales.</p>
              <p>Los proveedores solo podrán tratar la información para prestar los servicios contratados y deberán protegerla conforme a los requisitos aplicables.</p>
            </PolicySection>

            <PolicySection id="international-transfers" title="6. Transferencias internacionales de datos">
              <p>Realjet tiene su sede en China y presta servicio a clientes de varios países. Por tanto, la información enviada a través del sitio web puede tratarse en China o en otros países donde operen nuestros proveedores.</p>
              <p>Cuando la legislación aplicable exija garantías para una transferencia internacional, utilizaremos un mecanismo de transferencia lícito adecuado y medidas contractuales, organizativas o técnicas razonables.</p>
              <p>Puede ponerse en contacto con nosotros para solicitar más información sobre las garantías aplicables a sus datos.</p>
            </PolicySection>

            <PolicySection id="retention" title="7. Plazo de conservación">
              <p>Normalmente conservamos la información de las consultas de proyecto hasta <strong>24 meses después de la última interacción sustancial</strong> para poder responder a la evolución del proyecto y mantener un registro comercial adecuado.</p>
              <p>Si una consulta da lugar a un presupuesto, contrato, proyecto, litigio u obligación legal, la información pertinente podrá conservarse durante más tiempo conforme al contrato, los plazos de prescripción y los requisitos fiscales, contables, reglamentarios o legales aplicables.</p>
              <p>Los registros técnicos y de seguridad se conservan durante el periodo razonablemente necesario para operar y proteger el sitio web y resolver incidencias, sujeto a la configuración del proveedor correspondiente.</p>
              <p>Cuando la información deje de ser necesaria, la eliminaremos, anonimizaremos o aislaremos de forma segura, salvo que la ley exija conservarla.</p>
            </PolicySection>

            <PolicySection id="security" title="8. Seguridad de la información">
              <p>Aplicamos medidas administrativas, técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, pérdida, uso indebido, alteración o divulgación.</p>
              <p>Ningún sitio web, sistema de correo electrónico o transmisión por Internet puede garantizar una seguridad absoluta. No envíe documentos técnicos confidenciales ni datos personales sensibles mediante el formulario general. Cuando sea necesario, podemos acordar un canal de comunicación adecuado para el proyecto.</p>
            </PolicySection>

            <PolicySection id="your-rights" title="9. Sus derechos">
              <p>En función de la legislación aplicable, puede tener derecho a:</p>
              <ul>
                <li>solicitar confirmación sobre si tratamos sus datos personales;</li>
                <li>solicitar acceso a sus datos personales;</li>
                <li>solicitar la rectificación de datos inexactos o incompletos;</li>
                <li>solicitar la supresión de sus datos;</li>
                <li>solicitar la limitación de determinados tratamientos;</li>
                <li>oponerse a determinados tratamientos basados en intereses legítimos;</li>
                <li>retirar el consentimiento cuando el tratamiento se base en él;</li>
                <li>solicitar la portabilidad de los datos cuando proceda;</li>
                <li>solicitar información sobre destinatarios o transferencias internacionales;</li>
                <li>presentar una reclamación ante la autoridad de protección de datos u otro organismo competente de su país o región.</li>
              </ul>
              <p>Estos derechos pueden estar sujetos a condiciones y excepciones legales. Para ejercerlos, utilice los datos de contacto de la sección 1. Es posible que debamos verificar su identidad antes de tramitar la solicitud.</p>
            </PolicySection>

            <PolicySection id="cookies" title="10. Cookies y tecnologías similares">
              <p>El sitio web o su proveedor de alojamiento puede utilizar funciones técnicas o mecanismos de seguridad estrictamente necesarios para mostrar la página, procesar consultas, prevenir abusos o mantener la fiabilidad del servicio.</p>
              <p>Google Analytics 4 y, cuando esté configurada, la medición de conversiones de Google Ads son servicios opcionales de Google. «Aceptar todo» activa el almacenamiento de analítica, el almacenamiento publicitario, los datos de usuario para publicidad y la personalización de anuncios; «Solo analítica» activa únicamente el almacenamiento de analítica; «Rechazar todo» desactiva todas las finalidades opcionales.</p>
              <p>Puede modificar o retirar su elección en cualquier momento mediante las preferencias de cookies. Cuando se permiten, las etiquetas de Google pueden utilizar cookies y procesar información seudonimizada sobre el dispositivo, las páginas, las interacciones y la atribución publicitaria. El contenido del formulario de consulta no se envía a Google Analytics ni a Google Ads.</p>
              <ul>
                <li>Finalidad: medir el uso de las páginas, la eficacia del recorrido de consulta y, cuando estén configuradas, las conversiones publicitarias;</li>
                <li>Proveedor: Google LLC (Google Analytics 4 y Google Ads, cuando esté configurado);</li>
                <li>Datos: información seudonimizada sobre dispositivo, navegador, página e interacciones, sin el contenido del formulario;</li>
                <li>Control: el consentimiento puede otorgarse, rechazarse o retirarse en cualquier momento.</li>
              </ul>
              <AnalyticsPreferenceSwitch label="Gestionar las preferencias de cookies" />
            </PolicySection>

            <PolicySection id="children" title="11. Datos de menores">
              <p>Este sitio web y nuestros servicios de consulta están dirigidos a usuarios empresariales y profesionales. No se dirigen a menores y no recopilamos conscientemente datos personales de menores mediante el formulario.</p>
              <p>Si considera que un menor nos ha enviado datos personales, póngase en contacto con nosotros para que podamos revisarlos y eliminarlos cuando proceda.</p>
            </PolicySection>

            <PolicySection id="third-party-links" title="12. Enlaces de terceros">
              <p>Nuestro sitio web puede contener enlaces a sitios o servicios de terceros, cuyas prácticas de privacidad se rigen por sus propias políticas. No somos responsables de la privacidad, seguridad o contenido de sitios web de terceros.</p>
            </PolicySection>

            <PolicySection id="changes" title="13. Cambios en esta política de privacidad">
              <p>Podemos actualizar esta Política de privacidad cuando cambien nuestro sitio web, servicios, prácticas de datos u obligaciones legales.</p>
              <p>La política revisada se publicará en esta página con una nueva fecha de entrada en vigor. Los cambios sustanciales se destacarán o comunicarán de otro modo cuando lo exija la legislación aplicable.</p>
            </PolicySection>

            <PolicySection id="contact" title="14. Contacto">
              <p>Para consultas, solicitudes o reclamaciones sobre privacidad, póngase en contacto con:</p>
              <ContactCard />
              <p>Revisaremos su solicitud y responderemos dentro del plazo exigido por la legislación aplicable.</p>
            </PolicySection>
          </article>
        </div>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Todos los derechos reservados.</span>
          <a href="../../precast-beam-factory/es/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Líneas de producción</a>
        </div>
      </footer>
    </>
  );
}
