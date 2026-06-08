import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { readClient } from "@/sanity/lib/client";
import { NEWS_POST_QUERY, NEWS_RELATED_QUERY, ALL_NEWS_SLUGS_QUERY } from "@/sanity/lib/queries";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import NewsCard from "@/components/shared/NewsCard";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(readClient);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const categoryLabel: Record<string, string> = {
  "announcements": "Announcement",
  "climate-environment": "Climate & Environment",
  "peacebuilding": "Peacebuilding",
  "research": "Research",
  "partnerships": "Partnerships",
  "media-coverage": "Media Coverage",
};

/* ─── Static fallback articles (shown when CMS is unavailable) ─────────── */
type FallbackPost = {
  title: string; category: string; publishedAt: string;
  author: string; authorRole: string; excerpt: string;
  featuredImage?: undefined; content?: undefined;
  heroImage: string; heroAlt: string;
  body: string;
};

/* ─── Reading time helper ───────────────────────────────────────────────── */
function readingTime(text: string): number {
  return Math.ceil(text.split(" ").length / 200);
}

/* ─── Inline link parser helper ─────────────────────────────────────────── */
function parseInlineLinks(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`link-${keyCounter++}`}
        href={match[2]}
        className="text-forest hover:text-sage underline underline-offset-2 font-medium"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/* ─── Fallback body renderer ────────────────────────────────────────────── */
function renderFallbackBody(body: string): React.ReactNode {
  const blocks = body.split(/\n\n+/);
  const rendered: React.ReactNode[] = [];
  let listItems: string[] = [];
  let paragraphCount = 0;

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      rendered.push(
        <ul key={`ul-${key}`} className="list-disc list-outside pl-6 space-y-2 my-4 text-charcoal/75">
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{parseInlineLinks(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  blocks.forEach((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    const lines = trimmed.split("\n");

    // Check if entire block is bullet list items
    const allBullets = lines.every((l) => l.startsWith("• "));

    if (allBullets) {
      flushList(`before-${idx}`);
      const items = lines.map((l) => l.slice(2).trim());
      rendered.push(
        <ul key={`ul-${idx}`} className="list-disc list-outside pl-6 space-y-2 my-4 text-charcoal/75">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">{parseInlineLinks(item)}</li>
          ))}
        </ul>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList(`before-${idx}`);
      const headingText = trimmed.slice(3);
      rendered.push(
        <h2 key={`h2-${idx}`} className="font-display font-bold text-earth text-2xl mt-10 mb-4 leading-snug">
          {headingText}
        </h2>
      );
    } else if (trimmed.startsWith("> ")) {
      flushList(`before-${idx}`);
      const quoteText = trimmed.slice(2);
      rendered.push(
        <blockquote key={`bq-${idx}`} className="my-8 pl-6 border-l-4 border-forest italic text-earth font-display text-lg leading-relaxed">
          {parseInlineLinks(quoteText)}
        </blockquote>
      );
    } else {
      flushList(`before-${idx}`);
      paragraphCount++;
      rendered.push(
        <p key={`p-${idx}`} className="text-charcoal/75 leading-relaxed mb-5">
          {parseInlineLinks(trimmed)}
        </p>
      );
      // Insert newsletter CTA after 3rd paragraph
      if (paragraphCount === 3) {
        rendered.push(
          <div key="newsletter-cta" className="my-8 p-6 bg-forest/5 border border-forest/15 rounded-2xl">
            <p className="font-display font-bold text-forest text-lg mb-1">Get field updates from Kenya&apos;s ASALs</p>
            <p className="text-charcoal/60 text-sm mb-4">Join our community of supporters receiving ASREP&apos;s latest news and impact stories.</p>
            <a href="/#newsletter" className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-sm font-semibold rounded-lg hover:bg-sage transition-colors">
              Subscribe to updates →
            </a>
          </div>
        );
      }
    }
  });

  flushList("final");
  return <>{rendered}</>;
}

const fallbackArticles: Record<string, FallbackPost> = {
  "waso-eco-champions-10000-trees": {
    title: "Waso Eco-Champions Plant 10,000 Indigenous Trees Across Isiolo County",
    category: "climate-environment",
    publishedAt: "2026-04-01",
    author: "ASREP Africa Communications",
    authorRole: "ASREP Africa",
    excerpt: "ASREP Africa's flagship Waso Eco-Champions programme has reached a landmark milestone: 10,000 indigenous trees planted across 10 wards of Isiolo County, mobilising over 2,000 community eco-champions in one of Kenya's most ambitious community-led restoration efforts.",
    heroImage: "/images/gallery/waso-eco-champs-line.jpg",
    heroAlt: "Waso Eco-Champions lined up at a community tree planting event in Isiolo County",
    body: `In a landscape shaped by drought, seasonal floods, and decades of land degradation, 2,000 community members across Isiolo County have become the front line of ecological restoration. ASREP Africa's Waso Eco-Champions programme has now achieved a landmark milestone: 10,000 indigenous trees planted across all 10 wards of Isiolo County, Kenya.

The programme, launched as part of ASREP Africa's [Climate Resilience programme](/what-we-do/climate-resilience), was designed with a clear conviction — that sustainable environmental restoration must be community-led, community-owned, and community-sustained. In Kenya's arid and semi-arid lands (ASALs), which cover approximately 84% of the country's landmass, this conviction is not idealistic. It is existential.

## What the Waso Eco-Champions Do

Eco-champions are not merely tree planters. They are trained community stewards who monitor vegetation cover, report encroachment, engage local leaders, educate neighbours, and act as first responders when grazing pressure or charcoal burning threatens restored areas. Each ward has a cohort of eco-champions who meet regularly, share observations, and report to ASREP's programme team.

Day-to-day, an eco-champion might spend the morning checking on a recently planted acacia grove, spend the afternoon in a baraza educating younger community members about why certain tree species are protected, and end the day documenting observations in a simple field form. Over 2,000 community members now hold this role across Isiolo's 10 wards.

> "The trees we plant today are the shade our grandchildren will rest under. In the Borana culture, you do not own the land — you are a steward of it for those who come after you."

## Species Selection: Going Indigenous

A core principle of the Waso Eco-Champions programme is the exclusive use of indigenous tree species — those that evolved in this specific ecological zone and that pastoral communities have relied on for generations. The primary species include Acacia tortilis (umbrella thorn acacia), Acacia senegal (gum arabic), Commiphora species (myrrh and related trees), and Balanites aegyptiaca (desert date).

These are not ornamental choices. Acacia tortilis provides browse for livestock during dry seasons, nitrogen-fixing that improves soil fertility, and shade that reduces soil moisture loss. Commiphora species are harvested for frankincense and myrrh, providing direct income for families. Balanites produces edible fruits and seed oil used in traditional medicine. Every tree planted is a multi-function ecological and economic asset.

The selection of species was guided by participatory consultations with community elders, women groups, and the Kenya Forest Service (KFS), ensuring that restoration aligned with both ecological needs and cultural memory.

## Partnerships: KFS, KWS and Community Government

The Waso Eco-Champions programme operates in formal partnership with the Kenya Forest Service and the Kenya Wildlife Service. KFS provides technical guidance on species selection, seedling production protocols, and monitoring methodology. KWS contributes landscape-level intelligence, particularly regarding how restoration areas interact with wildlife corridors in and around the Isiolo region.

The programme also works closely with ward administrators and county government structures, ensuring that restored areas are recognised in local land-use plans and that eco-champions have formal standing when reporting violations. This institutional embeddedness is what distinguishes the programme from project-based tree-planting drives that fade when donor funding ends.

## Climate Adaptation Context

Isiolo County has experienced increasing climate volatility over the past two decades — longer dry spells, more intense flash floods, and greater unpredictability in the onset of rains. These shifts destabilise the pastoral livelihood system, which depends on seasonal movement to access water and pasture.

Ecological restoration addresses climate vulnerability in multiple ways. Tree cover slows erosion and retains topsoil during heavy rains. Root systems improve soil water infiltration, recharging shallow wells and seasonal rivers. Vegetation cover reduces surface temperatures. And restored landscapes support the recovery of grasses and shrubs that provide the pasture base for livestock.

ASREP Africa frames ecological restoration not as an environmental programme separate from livelihoods, but as a foundational investment in the climate resilience of pastoral communities themselves. The 10,000 trees planted to date represent a beginning, not an endpoint.

## Community Benefit and the Road Ahead

Beyond environmental outcomes, the Waso Eco-Champions programme has generated direct community benefits. Nursery operations have provided seasonal income for women's groups. Youth have been employed as field monitors. Schools have integrated tree stewardship into their activities. Communities that were once passive recipients of government conservation messaging are now active ecological managers.

ASREP Africa's target is ambitious: to expand the programme to neighbouring counties in Kenya's northern ASAL corridor while deepening the ward-level cohort model in Isiolo. The organisation is also working to develop verified carbon sequestration metrics for the programme, opening a potential pathway to community carbon finance that would create a sustainable funding base independent of external grant cycles.

Learn more about [our climate resilience programme](/what-we-do/climate-resilience) and how ASREP Africa is working to build ecological and human resilience across Kenya's ASALs.`,
  },

  "guardian-conservation-usaid": {
    title: "Big News: ASREP Africa Featured in The Guardian & Biographic Magazine — Global Conservation Stories",
    category: "media-coverage",
    publishedAt: "2026-03-16",
    author: "The Guardian",
    authorRole: "Global Environment Desk",
    excerpt: "The Guardian's global environment desk highlights ASREP Africa's community-led conservation model as a template for building locally-funded ecological restoration in an era of declining international aid and USAID funding reductions.",
    heroImage: "/images/gallery/asrep-forest-partnership.jpg",
    heroAlt: "ASREP Africa leaders in conservation partnership meeting",
    body: `In March 2026, The Guardian's global environment desk published an in-depth feature examining the future of conservation in a world where US foreign aid — long the cornerstone of biodiversity and environmental programmes across the Global South — has been dramatically curtailed. ASREP Africa and its Executive Director, Dida E. Fayo, were highlighted as a model for what locally-led conservation organisations can achieve without dependency on US government funding.

The context for the article was stark. The withdrawal of USAID funding from environmental programmes across Africa, Asia, and Latin America has created what conservation leaders are calling a "funding cliff" — a sudden and severe reduction in the financial infrastructure that has supported protected area management, wildlife conservation, and community environmental education for decades. The Guardian documented how major international conservation NGOs are struggling to adapt, while a new generation of locally-rooted organisations is demonstrating a fundamentally different model.

## ASREP's Model: Why It Is Different

ASREP Africa was founded in 2023 with a deliberate decision: to build an organisation whose survival and impact are not contingent on the continued flow of international aid. This is not idealism. It reflects a hard-learned lesson from decades of development work in Kenya's arid and semi-arid lands.

> "The communities we work with have been present in these landscapes for centuries. They do not need to be told about conservation — they have practised it. What they need is an organisation that amplifies their knowledge and connects them to resources and platforms where that knowledge is valued."

Dida Fayo, who holds a PhD candidacy and previously served as Director of Programs at the Northern Rangelands Trust, brought to ASREP Africa a deep scepticism of the "conservation-as-external-intervention" model. The organisation's six programmes — spanning climate resilience, peacebuilding, research, civic governance, biodiversity, and livelihoods — are all designed around community agency, not community compliance.

## What The Guardian's Feature Documented

The Guardian's reporting focused specifically on the Waso Eco-Champions programme, ASREP's flagship community ecological restoration initiative. Journalists documented the 2,000-strong network of community stewards across Isiolo County, the 10,000 indigenous trees planted without a single dollar of USAID funding, and the institutional partnerships with the Kenya Forest Service and Kenya Wildlife Service that provide technical credibility and government recognition.

The feature also highlighted the contrast between ASREP's model and that of larger international NGOs in the region. Where international organisations often bring standardised programme designs, external staff, and reporting structures oriented toward distant donors, ASREP works through existing community governance structures, employs local staff, and reports primarily to the communities it serves.

## Biographic Magazine: International Conservation Media Takes Notice

Shortly after the Guardian feature, ASREP Africa was also profiled in Biographic Magazine — the digital magazine published by the San Diego Zoo Wildlife Alliance that covers conservation science and stories globally. The Biographic feature examined ASREP's work through the lens of community-funded ecological restoration, exploring how the organisation is building financial sustainability through partnerships with institutions including the Kenya School of Government and community-based enterprises.

Together, these two international features — one from a major daily newspaper, one from a leading conservation publication — signal that ASREP Africa's model has achieved recognition beyond the immediate region. This recognition carries practical consequences: it opens doors to collaborative research, international speaking platforms, and relationships with global conservation networks that can provide non-financial support including technical expertise, peer learning, and advocacy amplification.

## Local Leadership as Conservation Strategy

ASREP Africa's appearance in The Guardian was notable not just for the organisation but for what it represents in the broader conservation landscape. For decades, the dominant narrative has positioned conservation as something that flows from north to south — expertise, funding, models, and standards generated in the Global North and applied in the Global South.

ASREP's work challenges this narrative from the inside, not through rhetoric but through demonstrated practice. The Waso Eco-Champions are Isiolo County residents who decided that their landscape needed restoration and organised to achieve it. The Isiolo Peace Actors Forum is run by pastoral community members who decided that durable peace requires their direct participation. The ASAL Indigenous Knowledge Vault was created because Borana Oromo communities recognised that their ecological knowledge was being lost and deserved documentation.

Learn more about how ASREP Africa is building [conservation and biodiversity programmes](/what-we-do/biodiversity) rooted in community leadership across Kenya's ASALs.`,
  },

  "ksg-under-tree-national": {
    title: "KSG 'Under the Tree' Civic Education Series Goes National",
    category: "partnerships",
    publishedAt: "2026-02-20",
    author: "ASREP Africa Communications",
    authorRole: "ASREP Africa",
    excerpt: "A landmark partnership with the Kenya School of Government scales the Isiolo-piloted civic education model to all 47 Kenyan counties — a testament to ASREP's community-sourced civic education approach and its national policy resonance.",
    heroImage: "/images/gallery/dida-fayo-remarks-under-tree-series-launch-oldonyiro.jpg",
    heroAlt: "ASREP Africa Executive Director Dida Fayo giving keynote remarks at the KSG Under the Tree Series launch in Oldonyiro",
    body: `There is a particular kind of civic knowledge that does not emerge from textbooks or government pamphlets. It lives in community gatherings, in the questions elders ask about who owns the land, in the discussions women have about why their names do not appear on title deeds, in the frustrations young people express about why their voices are absent from county planning processes. It is this knowledge — grounded, specific, and urgent — that ASREP Africa's partnership with the Kenya School of Government (KSG) is designed to centre.

The "Under the Tree" series, piloted in Oldonyiro ward in Isiolo County, has now been formally adopted by the Kenya School of Government for rollout across all 47 Kenyan counties. The announcement represents one of the most significant national policy outcomes in ASREP Africa's short history, and a validation of a civic education approach that deliberately rejected conventional classroom-based instruction.

## What "Under the Tree" Means

The name is literal and intentional. Civic education sessions in the "Under the Tree" series are conducted outdoors, in community spaces, under trees — the same spaces where pastoral communities have historically gathered for governance, dispute resolution, and collective decision-making. This choice is not aesthetic. It is structural.

In Kenya's ASAL communities, the physical location of learning carries cultural weight. A government office or classroom carries associations of bureaucracy, literacy requirements, and power differentials. An open-air community space, by contrast, signals belonging. It communicates that the knowledge being shared belongs to everyone present, not just those with formal education.

> "When we sit under the tree together, we are not students and teacher. We are community members thinking together about how we govern ourselves. That is the spirit of the Under the Tree series."

## The Oldonyiro Pilot

The pilot in Oldonyiro, a ward in Isiolo's North Isiolo constituency, was designed to test whether a participatory civic education model could generate genuine civic engagement in a community that has historically been marginalised from formal governance processes. The results exceeded expectations.

Participants included women, youth, pastoralists, small traders, and community elders — demographics that do not typically attend formal civic education events. Attendance was high and sustained across multiple sessions. Participants demonstrated measurable gains in knowledge about county budget processes, land rights, and community participation mechanisms. More importantly, several participants went on to engage directly with ward-level governance structures following the programme.

The pilot was documented and evaluated by ASREP Africa's Research and Knowledge programme, providing the evidence base that KSG used to make the case for national adoption.

## Prof Nura Mohamed's Dual Role

The partnership between ASREP Africa and the Kenya School of Government carries a distinctive dimension: Prof Nura Mohamed, who serves as Director General of the Kenya School of Government, is also the Chairman of ASREP Africa's Board of Directors. This dual role means that the institutional relationship between ASREP and KSG is not simply a transactional partnership but a deep alignment of vision and institutional leadership.

Prof Mohamed has championed the idea that civic education in Kenya must be decolonised — that it must speak in community languages, respect indigenous governance traditions, and engage citizens as active agents rather than passive recipients of government information. The "Under the Tree" series embodies this vision, and its national adoption through KSG represents a significant institutional endorsement.

## Why ASAL Communities Need This

Kenya's ASAL communities have been historically underserved by civic education programmes. Distance from government offices, low formal literacy rates, language barriers, and the seasonal mobility of pastoral livelihoods have all made conventional civic education inaccessible. The consequences are visible in governance data: ASAL counties consistently record lower civic participation rates, lower awareness of county budget processes, and lower uptake of government social protection programmes.

The "Under the Tree" model addresses these structural barriers directly. By taking education to the community, conducting sessions in local languages, using participatory and visual methods that do not depend on literacy, and partnering with existing community governance structures, the series reaches citizens who have been systematically excluded from civic life.

## The 47-County Rollout

The national rollout will be phased. The first wave, beginning in 2026, will focus on ASAL counties — the 23 counties classified as arid or semi-arid — where the civic education gap is most acute and where ASREP Africa's existing networks and knowledge can support programme implementation. Subsequent phases will expand to all 47 counties.

KSG will lead the rollout as the formal implementing institution, drawing on its national infrastructure and trainer networks. ASREP Africa will provide technical support, particularly on the participatory methodology, ASAL community engagement approaches, and monitoring frameworks.

The 47-county rollout of "Under the Tree" represents a rare example of a community-sourced innovation in Kenya's ASALs achieving national policy adoption. It reflects ASREP Africa's conviction that the knowledge and governance capacity needed to transform Kenya's marginalised regions already exists within those communities — and that the role of organisations like ASREP is to amplify it, not to import alternatives from elsewhere.

Explore more about [ASREP Africa's civic governance programme](/what-we-do/civic-governance) and how we are building inclusive governance across Kenya's ASALs.`,
  },

  "isiolo-peace-forum-500": {
    title: "Isiolo Peace Actors Forum Engages 500+ Community Members",
    category: "peacebuilding",
    publishedAt: "2025-08-10",
    author: "ASREP Africa Communications",
    authorRole: "ASREP Africa",
    excerpt: "The Isiolo Peace Actors Forum convened its largest session to date, bringing together 500+ pastoral communities, women leaders, and youth from across 10 wards of Isiolo County to address resource-driven conflict and build durable inter-community trust.",
    heroImage: "/images/gallery/community-women-peace-prayer.jpg",
    heroAlt: "Women community leaders in a peace prayer circle at the Isiolo Peace Actors Forum",
    body: `In the ASALs of northern Kenya, conflict over land, water, and livestock is not an aberration. It is a structural feature of pastoral life — driven by climate variability, population growth, inadequate governance of shared resources, and historical grievances between communities. Managing this conflict, preventing its escalation, and building the inter-community relationships that make durable peace possible require sustained, inclusive, and locally-grounded engagement. This is what the Isiolo Peace Actors Forum was created to do.

The Forum's largest session to date brought together over 500 participants — community elders, women leaders, youth representatives, local administrators, religious leaders, and members of ASREP Africa's partner networks — from all 10 wards of Isiolo County. The session addressed resource-driven conflict dynamics, inter-community grievances, and the governance mechanisms that can prevent violence before it erupts.

## The Nature of Pastoral Conflict

To understand why the Isiolo Peace Actors Forum matters, it is necessary to understand what peace in ASAL communities means and what threatens it. Pastoral conflict is typically triggered by competition over specific resources — a water point that has run dry, a grazing corridor that has been blocked by a new settlement, livestock that have been raided or have strayed across a community boundary. These are not abstract disputes. They are immediate, material, and often life-or-death for households whose survival depends entirely on the health of their herds.

What makes pastoral conflict particularly difficult to resolve through conventional means is its seasonal and spatially distributed nature. Communities whose territories overlap may be at peace during the wet season and in active conflict during a prolonged dry season when water and pasture become scarce. The conflict is not between fixed enemies but between neighbours whose relationship oscillates with the climate.

> "Peace in our communities is not a destination you arrive at once. It is something you tend every season, like a well that needs to be cleaned so the water flows clear."

## How the Forum Works

The Isiolo Peace Actors Forum brings together what ASREP Africa calls "peace actors" — individuals and institutions that have credibility, relationships, and influence within their communities and across community boundaries. These include:

• Elected and appointed local government officials who can activate formal governance responses
• Traditional leaders and elders who hold authority in customary dispute resolution
• Women's group leaders who often serve as informal mediators and community intelligence networks
• Youth representatives who are frequently both victims and perpetrators of conflict
• Religious leaders from Christian and Muslim communities whose moral authority crosses ethnic lines
• Representatives of community-based organisations working on shared interests including water, land, and livestock

The Forum operates through a structured but participatory process. Each session begins with a mapping of current conflict hotspots — specific locations, specific communities, specific triggers. This intelligence is generated by participants themselves, drawing on their direct knowledge and relationships. ASREP Africa's team facilitates but does not direct: the analysis and the solutions emerge from the people present.

## 60% Women and Youth Participation

A consistent feature of the Isiolo Peace Actors Forum is the deliberate prioritisation of women and youth participation, who together represent more than 60% of Forum membership. This is not tokenism — it reflects a hard-won understanding that sustainable peace processes fail when they exclude the communities most affected by conflict and most invested in its resolution.

Women in pastoral communities often bear the greatest burden of conflict: they manage households when men are away with herds, they are disproportionately affected by resource scarcity, they frequently lose family members to inter-community violence, and they are primary agents of reconciliation within and between communities. Yet formal peace negotiations have historically excluded them.

The Forum changes this by making women's participation a structural requirement, not an aspiration. Ward-level women's peace networks feed into Forum sessions. Women's voices are explicitly sought in the mapping of conflict triggers and the design of prevention strategies.

## PROCMURA Partnership

ASREP Africa's peacebuilding programme operates in partnership with the Programme for Christian-Muslim Relations in Africa (PROCMURA), whose interfaith networks provide a channel for peace messaging that crosses religious community boundaries. In Isiolo County, where both Christian and Muslim communities are present and occasionally implicated in conflict dynamics, PROCMURA's partnership is a practical asset.

## Outcomes and the Path to Durable Peace

The Forum does not produce peace through declarations. It produces peace through relationships — by creating sustained, structured opportunities for people who might otherwise encounter each other only in conflict situations to engage in shared problem-solving. Over successive sessions, participants have mapped and intervened in multiple specific conflict hotspots, negotiated access agreements for shared water points, established early warning networks that have prevented at least two significant conflict escalations, and built inter-community relationships that have proven resilient when new triggers have emerged.

ASREP Africa's conviction is that durable peace in Kenya's ASALs requires exactly this kind of locally-rooted, sustained, and inclusive engagement — and that organisations anchored in the communities they serve are uniquely positioned to provide it. The Forum's growth to 500+ participants across all 10 wards of Isiolo County is evidence that this conviction resonates with the communities themselves.

Learn more about [ASREP Africa's peacebuilding programme](/what-we-do/peacebuilding) and the work being done to build durable peace in Kenya's pastoral communities.`,
  },

  "ik-vault-debut-cows-women-land": {
    title: "ASAL IK Vault Series Debut: 'Cows, Women & Land' Documents Borana Oromo Knowledge",
    category: "research",
    publishedAt: "2025-09-30",
    author: "ASREP Africa Research Team",
    authorRole: "ASREP Africa",
    excerpt: "ASREP releases its debut ASAL Indigenous Knowledge Vault publication — 'Cows, Women & Land' — documenting Borana Oromo ecological and cultural knowledge from Isiolo County. The publication entered policy discourse at county and national level and set a new benchmark for IK documentation in Kenya's ASALs.",
    heroImage: "/images/gallery/asrep-elders-strategic-meeting.jpg",
    heroAlt: "ASREP Africa executive and community elders at an indigenous knowledge documentation meeting",
    body: `In the Borana Oromo culture, three things stand above all else: Cows. Women. Land. This tripartite foundation — livestock as economic life, women as social architecture, land as inherited responsibility — organises Borana society, governance, ecology, and identity. It is a philosophy of interdependence that has enabled pastoralist communities to survive and thrive across one of East Africa's most demanding landscapes for centuries.

It is also knowledge that is disappearing. As older knowledge-holders pass away without documented successors, as formal education systems fail to incorporate indigenous ecological wisdom, and as climate change and land fragmentation disrupt the practices through which IK is transmitted, the Borana Oromo knowledge system faces an accelerating loss. ASREP Africa created the ASAL Indigenous Knowledge Vault to interrupt this process.

## What the IK Vault Is

The ASAL Indigenous Knowledge Vault is ASREP Africa's systematic programme for documenting, validating, and making accessible the indigenous ecological, governance, and cultural knowledge held by ASAL communities. The Vault is not an archive in the traditional sense — a repository of documents consulted by researchers. It is designed as a living resource: accessible to communities themselves, relevant to contemporary policy debates, and structured to honour the authority of knowledge-holders.

> "We have been told for generations that development means adopting new practices. Nobody asked us what we already know. The IK Vault is us saying — here is what we know, and it matters."

The debut publication, "Cows, Women & Land," focuses on the Borana Oromo community of Isiolo County and documents three interconnected domains of indigenous knowledge: livestock ecology and herd management, women's roles and rights in pastoral governance, and customary land tenure and use practices.

## What Is in the Publication

"Cows, Women & Land" draws on a multi-year documentation process involving structured interviews with community elders, focus groups with women's councils, participatory mapping exercises, and ethnographic observation. Key content areas include:

• The Borana ecological calendar — a sophisticated seasonal knowledge system that guides decisions about herd movement, water access, grazing rotation, and livestock health interventions based on environmental indicators that have been accumulated and refined over generations
• Women's governance roles in Borana pastoralism, including the recognised authority of women in decisions about household resource allocation, inter-community negotiation during crises, and the transmission of ecological knowledge to children
• Customary land tenure concepts including the distinction between individual use rights and communal stewardship obligations — a distinction that has important implications for contemporary land policy in Kenya's ASAL counties
• Medicinal and nutritional knowledge associated with specific plant species found in the Isiolo landscape, including use patterns, harvest protocols, and the relationship between biodiversity and pastoral food security

Each section of the publication is presented in both technical and accessible language, with Borana Oromo terminology preserved and explained. The documentation process involved community validation sessions at which knowledge-holders reviewed draft content and corrected, supplemented, or contextualised it.

## Policy Implications

"Cows, Women & Land" entered policy discourse at both county and national levels within months of its release. The Isiolo County Government cited the publication in its deliberations on the County Spatial Plan, specifically in relation to customary land use provisions. At the national level, ASREP Africa presented findings from the publication to the National Land Commission in sessions addressing ASAL land policy reform.

The Jameel Observatory — a global research network focused on evidence-based policy for marginalised populations — partnered with ASREP Africa on the policy dissemination dimension of the publication, facilitating introductions to national and international policy networks.

The publication also contributed directly to ASREP Africa's participation in the SDZWA-Kenya (San Diego Zoo Wildlife Alliance Kenya) national biodiversity strategy validation process, where Borana ecological knowledge documented in the Vault was cited as evidence of community-held biodiversity knowledge that national conservation strategy must incorporate.

## Why This Matters for ASALs

ASAL communities in Kenya have long been subjects of external research — studied by academics, assessed by development organisations, described in policy documents — without being recognised as producers of knowledge. The ASAL IK Vault inverts this relationship. ASREP Africa is not extracting knowledge from communities and translating it for external audiences. It is documenting knowledge that communities already hold, validating it in partnership with those communities, and amplifying it to the policy audiences where it is most needed.

This matters for practical reasons. The Borana ecological calendar contains climate intelligence accumulated over centuries that is directly relevant to contemporary climate adaptation strategies. The customary land tenure concepts documented in "Cows, Women & Land" offer governance tools that could reduce resource conflict if incorporated into formal land administration. The medicinal plant knowledge documented holds implications for biodiversity conservation planning.

Future volumes in the ASAL IK Vault series will address other ASAL communities and other knowledge domains, building a comprehensive and authoritative body of documented indigenous knowledge that can inform policy and practice across Kenya's arid and semi-arid regions.

Explore [ASREP Africa's research and knowledge programme](/what-we-do/research-knowledge) for more on our approach to indigenous knowledge documentation and policy engagement.`,
  },

  "biographic-future-conservation": {
    title: "Biographic Magazine: The Future of Conservation Without US Aid",
    category: "media-coverage",
    publishedAt: "2026-01-15",
    author: "Biographic Magazine",
    authorRole: "International Conservation Media",
    excerpt: "International conservation magazine Biographic profiles ASREP Africa's Waso Eco-Champions model as a blueprint for community-funded ecological restoration that operates independently of international donor dependency.",
    heroImage: "/images/gallery/kenya-forest-service-tree-planting.jpg",
    heroAlt: "ASREP Africa and Kenya Forest Service jointly planting trees",
    body: `When Biographic Magazine — the digital publication of the San Diego Zoo Wildlife Alliance that has documented conservation stories from every continent — chose to profile ASREP Africa, the framing of the story was significant. The feature was not about wildlife. It was not about a charismatic species or a dramatic rescue. It was about a model: a new way of organising conservation that puts communities not just at the centre of the work, but at the centre of the decision-making, the ownership, and the financial sustainability.

The Biographic feature, published in early 2026, explored how ASREP Africa's programmes in Isiolo County are demonstrating that conservation effectiveness and community self-determination are not in tension — they are the same thing, properly understood.

## The Conservation Model Biographic Documented

At the heart of the Biographic feature was the Waso Eco-Champions programme: ASREP Africa's initiative that has mobilised 2,000 community members across Isiolo County's 10 wards to plant and steward 10,000 indigenous trees. But the story Biographic told was less about the numbers and more about the mechanism — about why this model works where externally-funded, externally-managed conservation programmes have struggled.

> "We are not importing conservation into these communities. Conservation has always been here — in the way people managed their herds, in the knowledge of which trees to protect, in the customary rules about water use. Our job is to support and amplify what communities already know."

Dida E. Fayo, ASREP Africa's Executive Director, articulated for Biographic what makes the organisation's approach distinctive. Having served previously as Director of Programs at the Northern Rangelands Trust and holding a PhD candidacy, Fayo brings both institutional experience and academic rigour to ASREP's model-building. The Biographic interview explored her perspective on the failures of conventional conservation philanthropy and the structural conditions that enable community-led alternatives to succeed.

## SDZWA-Kenya Partnership and Biodiversity Strategy

The Biographic feature also documented ASREP Africa's formal partnership with the San Diego Zoo Wildlife Alliance Kenya (SDZWA-K). This partnership operates on multiple levels — shared learning, technical collaboration, and joint participation in Kenya's national biodiversity strategy processes.

ASREP Africa was involved in the validation of Kenya's National Biodiversity Strategy and Action Plan (NBSAP) through the SDZWA-K partnership, contributing community-level biodiversity knowledge — particularly the indigenous ecological knowledge documented in the ASAL IK Vault — to a process that has historically been dominated by scientific and governmental actors.

This participation matters beyond the symbolic. When national biodiversity strategy incorporates community knowledge, it changes what conservation programmes are funded, how land is classified, and which communities are recognised as conservation actors rather than threats to conservation.

## Livelihoods and Conservation as One

A consistent theme in the Biographic feature was the integration of conservation and livelihoods in ASREP Africa's model. In conventional conservation, these two imperatives are often treated as competing: communities must be persuaded or compensated to forgo economic activities that damage ecosystems. ASREP's model rejects this framing.

The Waso Eco-Champions programme plants trees that provide browse for livestock, income through gum and resin harvesting, and soil improvement that sustains pastoral livelihoods. The ASAL IK Vault documents ecological knowledge that is inseparable from livelihood knowledge — the Borana ecological calendar guides both conservation and herd management simultaneously. The peacebuilding programme addresses resource conflicts that are both conservation and livelihood crises.

This integration means that community support for conservation is not dependent on financial incentives from external donors. It is driven by the community's own recognition that ecological health and livelihood security are the same interest.

## What Global Recognition Means for the Mission

For ASREP Africa, the Biographic and Guardian features represent more than communications achievements. They are assets that serve the organisation's mission in concrete ways.

International recognition opens relationships with global conservation networks including Alliance for Peacebuilding, Interpeace, and the Mercy Corps ecosystem, all of which are ASREP partners. It provides platforms for ASREP's leadership to present at international forums, shaping conservation policy discourse beyond Kenya. It attracts peer researchers and institutions interested in collaborative study of community-led conservation models. And it builds the credibility that enables ASREP Africa to engage as an equal with government institutions, bilateral funders, and international organisations that might otherwise treat a three-year-old Kenyan NGO as a beneficiary rather than a peer.

ASREP Africa's aim is not to become famous — it is to demonstrate, rigorously and at scale, that community-led conservation works. International media coverage is evidence that this demonstration is being observed.

Learn more about [ASREP Africa's biodiversity programme](/what-we-do/biodiversity) and the community-conservation model we are building across Kenya's ASALs.`,
  },
};

/* Related articles for sidebar — shown when CMS has no related posts */
const fallbackRelated = Object.entries(fallbackArticles)
  .map(([slug, post]) => ({
    _id: slug,
    title: post.title,
    slug: { current: slug },
    category: post.category,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    featuredImage: undefined as undefined,
  }));

export async function generateStaticParams() {
  // Include both CMS slugs and static fallback slugs
  const staticSlugs = Object.keys(fallbackArticles).map((slug) => ({ slug }));
  try {
    const cmsSlugs = await readClient.fetch(ALL_NEWS_SLUGS_QUERY);
    const combined = [...staticSlugs, ...cmsSlugs.map((s: { slug: string }) => ({ slug: s.slug }))];
    // Deduplicate
    return combined.filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i);
  } catch {
    return staticSlugs;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await readClient.fetch(NEWS_POST_QUERY, { slug });
    if (post) {
      return {
        title: `${post.title} | ASREP Africa`,
        description: post.metaDescription ?? post.excerpt,
        openGraph: {
          title: post.title,
          description: post.excerpt,
          images: post.featuredImage
            ? [{ url: urlFor(post.featuredImage).width(1200).height(630).url() }]
            : [],
        },
      };
    }
  } catch { /* fall through to static */ }

  const fallback = fallbackArticles[slug];
  if (fallback) {
    return {
      title: `${fallback.title} | ASREP Africa`,
      description: fallback.excerpt,
      openGraph: {
        title: fallback.title,
        description: fallback.excerpt,
        images: [{ url: fallback.heroImage, width: 1200, height: 630, alt: fallback.heroAlt }],
      },
    };
  }
  return { title: "Article Not Found | ASREP Africa" };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: {
    title: string; category: string; publishedAt: string; author?: string; authorRole?: string;
    excerpt: string; featuredImage?: SanityImageSource & { alt?: string };
    content?: unknown[];
    heroImage?: string; heroAlt?: string;
    body?: string;
  } | null = null;

  let relatedPosts: {
    _id: string; title: string; slug: { current: string }; category: string;
    excerpt: string; publishedAt: string; featuredImage?: SanityImageSource & { alt?: string };
  }[] = [];

  // Try CMS first
  try {
    const cmsPost = await readClient.fetch(NEWS_POST_QUERY, { slug }, { next: { revalidate: 60 } });
    if (cmsPost) {
      post = cmsPost;
      relatedPosts = await readClient.fetch(NEWS_RELATED_QUERY, {
        category: post!.category, slug,
      }, { next: { revalidate: 60 } });
    }
  } catch { /* CMS unavailable */ }

  // Fall back to static article data
  if (!post) {
    const fallback = fallbackArticles[slug];
    if (!fallback) notFound();
    post = fallback;
    relatedPosts = fallbackRelated
      .filter((r) => r.category === fallback.category && r._id !== slug)
      .slice(0, 3);
  }

  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const shareUrl = `https://asrepafrica.org/news/${slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  // Determine hero image
  const heroSrc = post.featuredImage
    ? urlFor(post.featuredImage).width(1920).height(900).url()
    : (post as { heroImage?: string }).heroImage ?? "/images/about/about-hero.jpg";
  const heroAlt = (post.featuredImage as { alt?: string } | undefined)?.alt
    ?? (post as { heroAlt?: string }).heroAlt ?? post.title;

  // Determine body for reading time (fallback only)
  const fallbackBody = (post as { body?: string }).body;

  // JSON-LD structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "author": { "@type": "Person", "name": post.author ?? "ASREP Africa" },
    "publisher": {
      "@type": "Organization",
      "name": "ASREP Africa",
      "logo": { "@type": "ImageObject", "url": "https://asrepafrica.org/logos/asrep-logo.png" }
    },
    "image": `https://asrepafrica.org${heroSrc.startsWith("/") ? heroSrc : "/" + heroSrc}`,
    "description": post.excerpt,
  };

  return (
    <article>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />

      {/* ── Hero image ──────────────────────────────────────────────────── */}
      <div className="relative min-h-[400px] md:min-h-[520px] bg-forest overflow-hidden">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />
        <div className="absolute inset-0 flex items-end z-10">
          <div className="container-asrep pb-12 pt-32 max-w-3xl">
            <BreadcrumbNav
              crumbs={[{ label: "News & Media", href: "/news" }, { label: "Article" }]}
              dark
            />
            <span className="inline-block mt-3 mb-4 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold">
              {categoryLabel[post.category] ?? post.category}
            </span>
            <h1 className="font-display text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              {post.author && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.author}{post.authorRole ? `, ${post.authorRole}` : ""}</span>
                </>
              )}
              {fallbackBody && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{readingTime(fallbackBody)} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="bg-cream">
        <div className="container-asrep py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Article content */}
            <div className="lg:col-span-2">
              {/* Lead paragraph */}
              <p className="text-charcoal text-lg leading-relaxed font-medium mb-8 border-l-4 border-gold pl-5">
                {post.excerpt}
              </p>

              {/* Portable text body from CMS */}
              {post.content && (
                <div className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-earth
                  prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-charcoal/75 prose-p:leading-relaxed
                  prose-a:text-forest prose-a:underline hover:prose-a:text-sage
                  prose-blockquote:border-gold prose-blockquote:text-earth prose-blockquote:font-display prose-blockquote:italic
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-strong:text-charcoal">
                  <PortableText value={post.content as Parameters<typeof PortableText>[0]["value"]} />
                </div>
              )}

              {/* Fallback body content */}
              {!post.content && fallbackBody && (
                <div className="space-y-0">
                  {renderFallbackBody(fallbackBody)}
                </div>
              )}

              {/* CTA to full story / external source when no body content at all */}
              {!post.content && !fallbackBody && (
                <div className="bg-white rounded-2xl p-8 border border-charcoal/8 shadow-sm">
                  <p className="text-charcoal/70 leading-relaxed mb-6">
                    For the full story and latest updates from ASREP Africa, visit our social media channels
                    or subscribe to our newsletter.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="px-5 py-2.5 bg-forest text-white font-semibold text-sm rounded-lg hover:bg-sage transition-colors"
                    >
                      Subscribe to Updates
                    </Link>
                    <a
                      href="https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-forest text-forest font-semibold text-sm rounded-lg hover:bg-forest/5 transition-colors"
                    >
                      Follow on LinkedIn
                    </a>
                  </div>
                </div>
              )}

              {/* Social share */}
              <div className="mt-12 pt-8 border-t border-charcoal/10">
                <p className="text-charcoal/50 text-xs uppercase tracking-widest font-semibold mb-4">Share this story</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, colour: "hover:bg-[#0077b5]" },
                    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, colour: "hover:bg-[#1877f2]" },
                    { name: "X / Twitter", href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, colour: "hover:bg-black" },
                    { name: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, colour: "hover:bg-[#25d366]" },
                  ].map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg bg-white border border-charcoal/15 text-charcoal/60
                        hover:text-white text-sm font-medium transition-all ${s.colour}`}
                      aria-label={`Share on ${s.name}`}>
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">More Stories</p>
                <div className="space-y-5">
                  {relatedPosts.slice(0, 3).map((rel) => (
                    <Link key={rel._id} href={`/news/${rel.slug.current}`}
                      className="block group">
                      <p className="text-xs text-muted mb-1">
                        {new Date(rel.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <p className="text-sm font-medium text-charcoal group-hover:text-forest transition-colors leading-snug line-clamp-3">
                        {rel.title}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link href="/news" className="flex items-center gap-1.5 mt-6 text-forest text-sm font-semibold hover:text-sage transition-colors">
                  View all stories →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="section-pad bg-white" aria-label="Related stories">
          <div className="container-asrep">
            <h2 className="font-display font-bold text-earth text-2xl mb-8">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedPosts.slice(0, 3).map((rel) => (
                <NewsCard
                  key={rel._id}
                  slug={rel.slug.current}
                  title={rel.title}
                  excerpt={rel.excerpt}
                  category={rel.category}
                  publishedAt={rel.publishedAt}
                  imageUrl={rel.featuredImage
                    ? urlFor(rel.featuredImage).width(640).height(400).url()
                    : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
