import { ArrowLeft, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";
import { openAnalyticsConsentSettings } from "../../precast-beam-factory/shared/analytics";

const sections = [
  ["who-we-are", "1. Qui sommes-nous"],
  ["information-we-collect", "2. Informations que nous collectons"],
  ["how-we-use-information", "3. Utilisation des données personnelles"],
  ["legal-bases", "4. Bases juridiques"],
  ["sharing", "5. Partage des données personnelles"],
  ["international-transfers", "6. Transferts internationaux de données"],
  ["retention", "7. Durée de conservation"],
  ["security", "8. Sécurité des informations"],
  ["your-rights", "9. Vos droits"],
  ["cookies", "10. Cookies et technologies similaires"],
  ["children", "11. Données relatives aux mineurs"],
  ["third-party-links", "12. Liens vers des tiers"],
  ["changes", "13. Modifications de la présente politique"],
  ["contact", "14. Nous contacter"],
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
          <span>N° 48, nouveau district de Jinzhou (zone de développement de Jinzhou), Ningxiang, Changsha, Hunan, Chine</span>
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
          <a href="../../precast-beam-factory/fr/" aria-label="Lignes de production d’éléments préfabriqués Realjet">
            <img src={logoImage} alt="Logo Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
          </a>
          <a href="../../precast-beam-factory/fr/" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white">
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="max-[430px]:hidden">Retour aux lignes de production</span>
            <span className="hidden max-[430px]:inline">Retour</span>
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
                <p className="text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Protection des données</p>
                <h1 className="mt-2 text-[clamp(36px,5vw,56px)] leading-[1.08] font-[900] tracking-[-0.04em]">Politique de confidentialité</h1>
                <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-white/72 max-[720px]:text-[15px]">
                  La présente politique explique comment Realjet collecte, utilise, conserve, partage et protège les données personnelles transmises par l’intermédiaire de notre site web et de nos formulaires de demande de projet.
                </p>
                <p className="mt-5 text-[12px] font-[750] text-white/55">Date d’entrée en vigueur : 1er août 2026</p>
              </div>
            </div>
          </div>
        </section>

        <div className="site-container grid grid-cols-[250px_minmax(0,1fr)] gap-12 py-16 max-[1000px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:py-10">
          <aside className="max-[1000px]:order-2">
            <nav aria-label="Sommaire de la politique de confidentialité" className="sticky top-24 rounded-card border border-line bg-soft p-5 max-[1000px]:static">
              <strong className="text-[13px] font-[850] tracking-[0.06em] text-brand-blue uppercase">Sur cette page</strong>
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
              <p>Changsha Ruijie Machinery Technology Co., Ltd. (« Realjet », « nous » ou « notre ») respecte votre vie privée et s’engage à traiter les données personnelles de manière responsable et transparente.</p>
              <p>La présente Politique de confidentialité explique comment nous collectons, utilisons, conservons, partageons et protégeons les données personnelles lorsque vous consultez notre site web, envoyez une demande de projet ou nous contactez.</p>
            </div>

            <PolicySection id="who-we-are" title="1. Qui sommes-nous">
              <p>Le responsable du traitement des données personnelles décrit dans la présente Politique de confidentialité est :</p>
              <ContactCard />
            </PolicySection>

            <PolicySection id="information-we-collect" title="2. Informations que nous collectons">
              <h3 className="font-[850] text-brand-navy">2.1 Informations que vous nous fournissez</h3>
              <p>Lorsque vous envoyez une demande de projet ou nous contactez, nous pouvons collecter :</p>
              <ul>
                <li>le nom de votre entreprise ;</li>
                <li>votre nom ;</li>
                <li>votre pays ou région ;</li>
                <li>votre adresse e-mail professionnelle ;</li>
                <li>des informations sur votre projet, telles que le type de produit, les quantités, la production cible, le calendrier, les conditions du site et l’état d’avancement ;</li>
                <li>l’objet ou le type de demande ;</li>
                <li>la confirmation que vous avez consulté la présente Politique de confidentialité ;</li>
                <li>toute autre information que vous choisissez d’inclure dans votre message ou dans des échanges ultérieurs.</li>
              </ul>
              <p>N’envoyez pas de données personnelles sensibles qui ne sont pas nécessaires à votre demande de projet.</p>
              <h3 className="pt-2 font-[850] text-brand-navy">2.2 Informations techniques</h3>
              <p>Nos prestataires d’hébergement web, de traitement des formulaires, de sécurité ou de messagerie peuvent recevoir automatiquement des informations techniques limitées lorsque vous accédez au site ou l’utilisez. Celles-ci peuvent inclure :</p>
              <ul>
                <li>adresse de protocole Internet (IP) ;</li>
                <li>type de navigateur et d’appareil ;</li>
                <li>page demandée ou page de provenance ;</li>
                <li>date et heure d’accès ;</li>
                <li>informations élémentaires de sécurité, de diagnostic et journaux du serveur.</li>
              </ul>
              <p>Avec votre consentement, nous utilisons Google Analytics 4 pour comprendre l’utilisation de la page et améliorer le parcours de demande de projet. Nous enregistrons des événements d’utilisation pseudonymisés, tels que l’affichage de la page, l’emplacement du bouton d’action sélectionné, la progression du formulaire par nom de champ, les tentatives d’envoi et leur résultat. Les valeurs saisies dans le formulaire — notamment l’entreprise, le nom du contact, l’adresse e-mail, le pays et les détails du projet — ne sont pas transmises à Google Analytics.</p>
            </PolicySection>

            <PolicySection id="how-we-use-information" title="3. Utilisation des données personnelles">
              <p>Nous utilisons les données personnelles pour :</p>
              <ul>
                <li>recevoir, évaluer et traiter votre demande ;</li>
                <li>comprendre vos besoins de production et préparer les informations techniques, commerciales ou relatives aux équipements qui sont pertinentes ;</li>
                <li>communiquer avec vous au sujet de votre projet ;</li>
                <li>organiser des échanges techniques, devis, démonstrations ou prestations d’assistance ;</li>
                <li>conserver une trace des communications commerciales ;</li>
                <li>protéger la sécurité et le bon fonctionnement de notre site web et de nos systèmes de demande ;</li>
                <li>respecter nos obligations légales, réglementaires et contractuelles ;</li>
                <li>constater, exercer ou défendre des droits en justice ;</li>
                <li>améliorer notre site web, nos services et nos processus de gestion des demandes à l’aide, dans la mesure du possible, d’informations agrégées ou non identifiantes.</li>
              </ul>
              <p>Nous n’utilisons pas les informations issues des demandes pour prendre des décisions fondées exclusivement sur un traitement automatisé produisant des effets juridiques ou similaires.</p>
            </PolicySection>

            <PolicySection id="legal-bases" title="4. Bases juridiques">
              <p>Selon votre lieu de résidence et les circonstances, nous traitons les données personnelles sur une ou plusieurs des bases juridiques suivantes :</p>
              <ul>
                <li><strong>Mesures précontractuelles demandées ou exécution d’un contrat :</strong> lorsque nous répondons à une demande, préparons une proposition ou échangeons au sujet d’un projet potentiel ou existant ;</li>
                <li><strong>Intérêts légitimes :</strong> lorsque cela est nécessaire pour gérer notre activité, répondre aux demandes commerciales, tenir des registres appropriés, protéger nos systèmes et améliorer nos services, sous réserve que vos droits ne prévalent pas sur ces intérêts ;</li>
                <li><strong>Consentement :</strong> lorsque vous avez donné un consentement clair pour une finalité précise et que la législation applicable l’exige ;</li>
                <li><strong>Obligations légales :</strong> lorsque le traitement est nécessaire pour respecter les lois, règlements ou demandes licites applicables.</li>
              </ul>
              <p>Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment. Ce retrait n’affecte pas la licéité des traitements réalisés auparavant.</p>
            </PolicySection>

            <PolicySection id="sharing" title="5. Partage des données personnelles">
              <p>Nous pouvons partager des données personnelles, uniquement lorsque cela est nécessaire, avec :</p>
              <ul>
                <li>le personnel autorisé de Realjet chargé des ventes, de l’ingénierie, de la gestion de projet, du service client, des affaires juridiques, des finances ou des technologies de l’information ;</li>
                <li>les prestataires d’hébergement web, de traitement des formulaires, de messagerie, de stockage dans le cloud, de cybersécurité et d’autres services technologiques agissant pour notre compte ;</li>
                <li>les conseillers professionnels, auditeurs, assureurs ou consultants lorsque cela est raisonnablement nécessaire ;</li>
                <li>les autorités publiques, organismes de réglementation, tribunaux ou services chargés de l’application de la loi lorsque la loi l’exige ou que cela est nécessaire pour protéger des droits légaux ;</li>
                <li>un acquéreur, investisseur ou organisme successeur dans le cadre d’une opération réelle sur l’entreprise, sous réserve de mesures appropriées de confidentialité et de protection des données.</li>
              </ul>
              <p>Nous ne vendons pas de données personnelles.</p>
              <p>Les prestataires ne peuvent traiter les informations que pour fournir les services convenus et doivent les protéger conformément aux exigences applicables.</p>
            </PolicySection>

            <PolicySection id="international-transfers" title="6. Transferts internationaux de données">
              <p>Realjet est établie en Chine et dessert des clients dans plusieurs pays. Les informations envoyées par l’intermédiaire du site peuvent donc être traitées en Chine ou dans d’autres pays où nos prestataires exercent leurs activités.</p>
              <p>Lorsque la législation applicable exige des garanties pour un transfert international, nous utiliserons un mécanisme de transfert licite approprié ainsi que des mesures contractuelles, organisationnelles ou techniques raisonnables.</p>
              <p>Vous pouvez nous contacter pour obtenir davantage d’informations sur les garanties applicables à vos données.</p>
            </PolicySection>

            <PolicySection id="retention" title="7. Durée de conservation">
              <p>Nous conservons généralement les informations relatives aux demandes de projet jusqu’à <strong>24 mois après la dernière interaction substantielle</strong> afin de pouvoir suivre l’évolution du projet et tenir des registres commerciaux appropriés.</p>
              <p>Si une demande donne lieu à un devis, un contrat, un projet, un litige ou une obligation légale, les informations pertinentes peuvent être conservées plus longtemps conformément au contrat, aux délais de prescription et aux exigences fiscales, comptables, réglementaires ou légales applicables.</p>
              <p>Les journaux techniques et de sécurité sont conservés pendant la durée raisonnablement nécessaire au fonctionnement et à la protection du site ainsi qu’à la résolution des incidents, sous réserve de la configuration du prestataire concerné.</p>
              <p>Lorsque les informations ne sont plus nécessaires, nous les supprimons, les anonymisons ou les isolons de manière sécurisée, sauf si leur conservation est imposée par la loi.</p>
            </PolicySection>

            <PolicySection id="security" title="8. Sécurité des informations">
              <p>Nous appliquons des mesures administratives, techniques et organisationnelles raisonnables pour protéger les données personnelles contre tout accès non autorisé, perte, utilisation abusive, altération ou divulgation.</p>
              <p>Aucun site web, système de messagerie ou transmission par Internet ne peut garantir une sécurité absolue. N’envoyez pas de documents techniques confidentiels ni de données personnelles sensibles au moyen du formulaire général. Si nécessaire, nous pouvons convenir d’un canal de communication adapté au projet.</p>
            </PolicySection>

            <PolicySection id="your-rights" title="9. Vos droits">
              <p>Selon la législation applicable, vous pouvez avoir le droit de :</p>
              <ul>
                <li>demander si nous traitons vos données personnelles ;</li>
                <li>demander l’accès à vos données personnelles ;</li>
                <li>demander la rectification de données inexactes ou incomplètes ;</li>
                <li>demander l’effacement de vos données ;</li>
                <li>demander la limitation de certains traitements ;</li>
                <li>vous opposer à certains traitements fondés sur des intérêts légitimes ;</li>
                <li>retirer votre consentement lorsque le traitement repose sur celui-ci ;</li>
                <li>demander la portabilité des données, le cas échéant ;</li>
                <li>demander des informations sur les destinataires ou les transferts internationaux ;</li>
                <li>introduire une réclamation auprès de l’autorité de protection des données ou d’un autre organisme compétent de votre pays ou région.</li>
              </ul>
              <p>Ces droits peuvent être soumis à des conditions et exceptions légales. Pour les exercer, utilisez les coordonnées figurant à la section 1. Nous pouvons être amenés à vérifier votre identité avant de traiter la demande.</p>
            </PolicySection>

            <PolicySection id="cookies" title="10. Cookies et technologies similaires">
              <p>Le site ou son hébergeur peut utiliser des fonctions techniques ou des mécanismes de sécurité strictement nécessaires à l’affichage des pages, au traitement des demandes, à la prévention des abus ou à la fiabilité du service.</p>
              <p>Google Analytics 4 est un service d’analyse facultatif fourni par Google. Le stockage des données d’analyse est refusé par défaut et n’est activé qu’après avoir sélectionné « Accepter l’analyse ». Le stockage publicitaire, les données utilisateur à des fins publicitaires et la personnalisation des annonces restent désactivés.</p>
              <p>Vous pouvez accepter ou refuser l’analyse, puis modifier votre choix à tout moment dans les paramètres d’analyse.</p>
              <ul>
                <li>Finalité : mesurer l’utilisation des pages et l’efficacité du parcours de demande ;</li>
                <li>Prestataire : Google LLC (Google Analytics 4) ;</li>
                <li>Données : informations pseudonymisées sur l’appareil, le navigateur, la page et les interactions, sans le contenu du formulaire ;</li>
                <li>Contrôle : le consentement peut être accordé, refusé ou retiré à tout moment.</li>
              </ul>
              <button type="button" onClick={openAnalyticsConsentSettings} className="mt-2 inline-flex min-h-10 items-center rounded-lg border border-brand-blue/25 bg-soft px-4 text-[13px] font-[800] text-brand-blue transition hover:border-brand-blue hover:bg-white">Gérer les préférences d’analyse</button>
            </PolicySection>

            <PolicySection id="children" title="11. Données relatives aux mineurs">
              <p>Ce site web et nos services de demande sont destinés aux utilisateurs professionnels. Ils ne s’adressent pas aux mineurs et nous ne collectons pas sciemment de données personnelles de mineurs au moyen du formulaire.</p>
              <p>Si vous pensez qu’un mineur nous a envoyé des données personnelles, contactez-nous afin que nous puissions les examiner et les supprimer, le cas échéant.</p>
            </PolicySection>

            <PolicySection id="third-party-links" title="12. Liens vers des tiers">
              <p>Notre site web peut contenir des liens vers des sites ou services tiers, dont les pratiques de confidentialité sont régies par leurs propres politiques. Nous ne sommes pas responsables de la confidentialité, de la sécurité ni du contenu des sites tiers.</p>
            </PolicySection>

            <PolicySection id="changes" title="13. Modifications de la présente politique">
              <p>Nous pouvons mettre à jour la présente Politique de confidentialité lorsque notre site, nos services, nos pratiques relatives aux données ou nos obligations légales évoluent.</p>
              <p>La politique révisée sera publiée sur cette page avec une nouvelle date d’entrée en vigueur. Les modifications importantes seront mises en évidence ou communiquées autrement lorsque la législation applicable l’exige.</p>
            </PolicySection>

            <PolicySection id="contact" title="14. Nous contacter">
              <p>Pour toute question, demande ou réclamation relative à la confidentialité, contactez :</p>
              <ContactCard />
              <p>Nous examinerons votre demande et y répondrons dans le délai prévu par la législation applicable.</p>
            </PolicySection>
          </article>
        </div>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Tous droits réservés.</span>
          <a href="../../precast-beam-factory/fr/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Lignes de production</a>
        </div>
      </footer>
    </>
  );
}
