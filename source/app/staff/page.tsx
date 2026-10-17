import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { TriadMark } from "../components/TriadMark";
import { StaffDirectory, type StaffPerson } from "./StaffDirectory";

export const metadata: Metadata = {
  title: "Staff | Vineyard Florence Church",
  description: "Meet the pastors, directors and ministry leaders who serve Vineyard Florence Church.",
};

const staff: StaffPerson[] = [
  {
    name: "Ryan Snow",
    role: "Lead Pastor",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1656369764820-4LKL5LX1ZZJC8CZHR5XH/IMG_1071.jpg",
    bio: "Ryan has led VF since 2021 and has served within the Vineyard movement since 1993. His heart is prayer, discipleship and multiplication.",
    fullBio: [
      "Ryan Snow has been the Lead Pastor of Vineyard Florence since 2021. He has been married to the love of his life, Karla, since 1999. Together they have four children, a son-in-law, a grandchild and an ancient English Bulldog. Ryan has been connected to the Vineyard movement since 1993 and has pastored in and around the movement since 1996. At VF, he serves as lead pastor, elder, intercessor, servant and disciple-maker.",
      "Ryan also co-leads and co-founded Cincy Underground, a collective of disciple-makers across the region. He serves as the North American Regional Prayer Hub Leader for New Generations in Greater Cincinnati, helping raise up intercessors who pray the region toward revival. He also leads Vineyard Global’s Middle Eastern Refugee Partnership, a collaboration of local churches meeting the practical and spiritual needs of primarily Persian refugees in Asia and Europe.",
      "Ryan’s heart for ministry is simple and bold: “I want to see 1,000,000 people come to Jesus before I die. I am not called to do this alone. I want to be a catalyst in creating a culture of disciple-making movements, missional living and a place where Jesus-everything people train the saved and seek and save the lost.”",
    ],
  },
  {
    name: "Amanda Price",
    role: "Associate & Student Pastor",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1753978492005-ZEX5C80FN1GGUCSN6M16/staff+head+shots.png",
    bio: "As Associate and Student Pastor, Amanda helps people build a whole-life faith and become disciples who make disciples, drawing on rich ministry and music training.",
    fullBio: [
      "Amanda’s life mission is making “Jesus-everything” disciples who go on to make more disciples—basically spiritual multiplication, minus the awkward math. As Associate Pastor and leader of Student Ministry, she gets to live that mission every day by pouring into students and helping them fall in love with Jesus.",
      "Amanda holds a Bachelor of Music in Vocal Performance and Biblical Studies from Moody Bible Institute, plus a master’s degree in Music Education with a focus on Vocal Pedagogy from the University of Kansas. So yes, she can explain a theological concept and hit a high note while doing it—rarely at the same time, but she is working on it.",
      "When she is not at church, you may find Amanda hiking, tracking down good food or chasing her foster kids around like it is a full-contact sport—because it is. At the end of the day, she believes faith is not just something you do on Sundays; it is a whole-life kind of thing. Warning: hanging out with her may result in spontaneous discipleship.",
    ],
  },
  {
    name: "Amber Brown",
    role: "Outreach & Recovery Pastor",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1768501855359-U3QZDXF6716JJ8N46A1N/IMG_2344.jpg",
    bio: "Amber serves people in difficult places through recovery ministry, community partnerships and practical care for families across Northern Kentucky.",
    fullBio: [
      "Amber Brown is Vineyard Florence’s Recovery and Outreach Pastor. She has been married to her husband, Adam, since 2004, and they have a son and a daughter. Their family lives on a farm with plenty of chickens, dogs and various other pets. Amber has called Vineyard Florence home since 2013.",
      "Amber has a heart for people who feel lost or find themselves in broken places. She leads Celebrate Recovery on Monday nights, serves families through the church’s Free Grocery Store and loves sharing Jesus and praying with people. She also builds relationships throughout the local community so Vineyard Florence can better serve area schools and families. As Amber likes to say, the work of the Gospel is never done.",
      "When she is off the clock, you will probably find Amber at the farm or sitting beside her husband at a sporting event, cheering on their children.",
    ],
  },
  {
    name: "Hanna McGuire-Jaeger",
    role: "Kids Ministry Director",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1753973218079-D3TM38ZLZ0RXJVQ8F10X/4.png",
    bio: "Hanna brings joy, energy and a deep commitment to helping children know Jesus while partnering closely with parents and caregivers.",
    fullBio: [
      "Hanna is Vineyard Florence’s Kids Ministry Director. She and her husband, Steve, have a beautifully blended family of nine children—four biological children and five adopted through the foster-care system. All but one are girls, so life at home is rarely quiet.",
      "Vineyard Florence has been Hanna’s church home since early 2021, and she began serving in Kids Ministry right away. Her passion for discipling children, desire to fulfill Jesus’ calling in her life and unmistakable energy make her role at VF a natural fit.",
    ],
  },
  {
    name: "Myles Roberts",
    role: "Worship & Social Media Director",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1753985366110-ER6AORWX3X73AF6HJ274/staff+head+shots.png",
    bio: "Myles creates spaces where people can connect with God, combining years of worship leadership with a love for music and storytelling.",
    fullBio: [
      "Myles has been leading worship since he was 14, beginning alongside his dad, and has served bi-vocationally in worship ministry since 2011. He has a deep passion for creating spaces where people can genuinely connect with God and experience His presence. He also loves the creative process and uses storytelling to engage and inspire—whether in ministry or marketing.",
      "Myles has been married to his incredible wife, Amanda, for more than 11 years. He says she is the true definition of “marrying up.” Together they are raising three amazing daughters who are already showing their own love for worship.",
      "When Myles is off the clock, you will probably find him at a tea party playing dress-up with his girls or in the middle of a family dance party. He is a big Bengals and Reds fan, loves to cook and almost always has music playing in the house.",
    ],
  },
  {
    name: "Karla Snow",
    role: "Administrator & Vinedresser Founder",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1656370290683-WETW4RJ0G1XT9SWFSN7S/image-asset.jpeg",
    bio: "Karla supports the church office and founded The Vinedresser, providing clothing and essentials to foster and kinship families.",
    fullBio: [
      "Karla Snow is married to Vineyard Florence’s lead pastor, Ryan. They have four children—Olivia, Elijah, Sophia and Naomi—a son-in-law, Joe, and a precious grandson, Gideon. Karla has been part of the Vineyard church since she was seven years old and has called Vineyard Florence home since the spring of 2021.",
      "In the fall of 2021, Karla founded The Vinedresser Foster and Kinship Shop and continues to serve as its director. The Vinedresser provides free, in-season clothing and accessories for new and ongoing foster-care placements and kinship families throughout Northern Kentucky. Karla has long carried a heart for foster families and the foster-care community.",
      "Karla is a homeschool mom of more than 20 years, a part-time church administrator, disciple-maker and foster and adoptive parent. She loves all things creative and enjoys refinishing and restoring furniture, home design and cooking.",
    ],
  },
  {
    name: "Carol Cui",
    role: "Finance & Bookkeeping Director",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1701096599553-J9KRZ61NODBQ8MGH1W2S/image-asset.png",
    bio: "Carol stewards Vineyard Florence’s finances and loves growing in faith, following Jesus and serving the church alongside her family.",
    fullBio: [
      "Carol is Vineyard Florence’s Finance and Bookkeeping Director. She and her husband, Charlie, began attending VF in September 2022. They have two boys, Rowan and Edwin. Carol is Korean, was born and raised in China and speaks Korean, Chinese and English.",
      "In Carol’s words, “Vineyard Church has been a blessing to me and my family. My faith has grown so much since I began attending, and I want to continue following our church’s vision and mission to love God, make disciples and impact the world.”",
      "Something you may not know about Carol: she enjoys k-drama so if you're also a mega fan, ask her about it!",
    ],
  },
  {
    name: "Denise Willen",
    role: "Custodial Care Leader",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1656371055920-4TGS0IZFL2M42IDR7FCA/image-asset.jpeg",
    bio: "Denise leads the team that cares for the church building and also serves through prayer, House Groups and The Vinedresser.",
    fullBio: [
      "Denise and her husband, Bob, have been married for more than 25 years and own a trucking company together. She has two children, Karla Snow and Matthew Tobien, and six grandchildren: Olivia, Elijah, Sophia, Naomi, Lilly and Jakob. Denise has attended Vineyard Florence since the spring of 2021.",
      "With the help of several generous volunteers, Denise manages the appearance and cleanliness of the church building. She also serves with the Intercessory Prayer Group, participates in a House Group, partners with The Vinedresser and steps in wherever she is needed.",
      "Denise loves to pray, garden, cook, design and tackle home-improvement projects. She also loves being a wife, mother and grandmother. Her hope for Vineyard Florence is that everyone would be obedient to God’s Word and pleasing to the Lord—Matthew 25:21.",
    ],
  },
  {
    name: "Chris Cousin",
    role: "Maintenance Director",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1665423955835-Z5XB0RBJG8KKB41RUINE/IMG_9989.jpg",
    bio: "Chris is an ordained pastor, Maintenance Director and leader of the Men of Courage ministry, bringing a servant’s heart, practical skill and longstanding outreach experience.",
    fullBio: [
      "Chris is an ordained pastor who has been part of Vineyard Florence for more than 18 years and previously served as Outreach Pastor for six years. He also leads the Men of Courage ministry. Chris has been married to his wife, Robin, for more than 24 years, and together they have three children and a grandson.",
      "Chris’ hope for outreach is “that the ministry comes alive in the hearts of the church and becomes who we are—not just what we do.” He continues to bring that same servant’s heart and practical care to his role as Maintenance Director.",
      "Chris is an avid hunter and a die-hard Chicago Bears fan. He loves to cook—especially smoked food—and is always ready for the next opportunity to serve.",
    ],
  },
];

const elders = [
  {
    name: "Ryan Snow",
    role: "Prayer Pillar",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1657135386505-1GTAT3GUTREKBP4FR9SA/IMG_1072.jpg",
    bio: "Ryan serves the Elder Board through the Prayer Pillar, helping keep prayer and the presence of God central to the life of Vineyard Florence.",
  },
  {
    name: "Jon Allis",
    role: "Discipleship Pillar",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1667270658199-4B0PYZ8JPOYS3ODOZT44/image.jpg",
    bio: "Jon serves the Elder Board through the Discipleship Pillar, supporting a culture of people becoming and making disciples of Jesus.",
  },
  {
    name: "Jeff Fasick",
    role: "Worship & Sunday Mornings Pillar",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1711567466176-4G6QDPWZFGBUCL4YBB1X/image-asset.png",
    bio: "Jeff serves the Elder Board through the Worship and Sunday Mornings Pillar, helping steward the church’s weekly gathering.",
  },
  {
    name: "Bob Kendig",
    role: "Outreach Pillar",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1733922445922-STJS982FEKYJROK14VVS/staff+head+shots.jpg",
    bio: "Bob serves the Elder Board through the Outreach Pillar, encouraging practical service and mission across Northern Kentucky and beyond.",
  },
  {
    name: "Sean Gallagher",
    role: "Students Pillar",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1733922463449-3K94S62R6RHOL65J4K6J/staff+head+shots+(1).jpg",
    bio: "Sean serves the Elder Board through the Students Pillar, supporting the discipleship and care of Vineyard Florence’s students.",
  },
  {
    name: "Carol Jenkins",
    role: "Kids Pillar",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1744126131432-BXAH5022SNGG35KI9CVX/staff+head+shots.png",
    bio: "Carol serves the Elder Board through the Kids Pillar, helping Vineyard Florence partner with families as children learn to know Jesus.",
  },
  {
    name: "Jerry Barron",
    role: "Stewardship Pillar",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1764797175559-2QV082HHV02XG2D0W2CZ/IMG_0551.jpg",
    bio: "Jerry serves the Elder Board through the Stewardship Pillar, helping the church faithfully care for the resources entrusted to it.",
  },
  {
    name: "Heather Enzweiler",
    role: "Elder",
    image: "https://images.squarespace-cdn.com/content/v1/5c95344165019fb219081fd2/1764796908200-DBMKNSTJDMH60W1FLW2C/IMG_0737.jpg",
    bio: "Heather serves the Elder Board, bringing prayerful discernment, trusted leadership and care to the life of Vineyard Florence.",
  },
];

export default function StaffPage() {
  return (
    <main className="interior-page staff-page" id="top">
      <InteriorHeader />

      <section className="staff-hero">
        <div className="interior-hero-copy">
          <p className="eyebrow light">The People Of Vineyard Florence</p>
          <h1>Here To Serve.<br /><em>Here For You.</em></h1>
          <p>Pastors, leaders, builders and listeners—one team helping people love God, make disciples and impact the world.</p>
          <a className="button button-light" href="#meet-the-team">Meet the team <span aria-hidden="true">↓</span></a>
        </div>
        <div className="staff-hero-gallery">
          <figure
            className="staff-team-photo"
            tabIndex={0}
            aria-label="Vineyard Florence staff team; focus to see the candid team photo"
          >
            <img
              className="staff-team-photo-primary"
              src="/images/vineyard-florence/staff-team.webp"
              alt="The Vineyard Florence staff team"
              width="1536"
              height="1152"
              fetchPriority="high"
              decoding="async"
            />
            <img
              className="staff-team-photo-hover"
              src="/images/vineyard-florence/staff-team-hover.webp"
              alt=""
              width="1536"
              height="1152"
              loading="eager"
              decoding="async"
              aria-hidden="true"
            />
          </figure>
        </div>
        <div className="hero-outline-word interior-outline" aria-hidden="true">TOGETHER</div>
      </section>

      <section className="staff-intro" id="meet-the-team">
        <TriadMark index={1} label="Our Team" />
        <div>
          <p className="eyebrow">Different Callings. One Shared Yes.</p>
          <h2>People Who Are<br /><em>Here For People.</em></h2>
        </div>
        <p>Ministry is never a one-person story. Meet the people helping Vineyard Florence make room for worship, belonging, healing and mission.</p>
      </section>

      <StaffDirectory people={staff} />

      <section className="staff-intro leadership-intro">
        <TriadMark index={2} label="Elder Board" />
        <div>
          <p className="eyebrow">Spiritual Care And Shared Discernment</p>
          <h2>Leading Through<br /><em>Our Pillars.</em></h2>
        </div>
        <p>Our Elders help prayerfully shepherd Vineyard Florence through ministry Pillars, bringing wisdom, accountability and care to the life of the church.</p>
      </section>

      <section className="staff-grid leadership-grid" aria-label="Vineyard Florence elder board">
        {elders.map((person) => (
          <article className="staff-card" key={person.name}>
            <div className="staff-photo">
              <img src={person.image} alt={`${person.name}, ${person.role}`} loading="lazy" decoding="async" />
            </div>
            <div className="staff-card-copy">
              <p className="eyebrow">{person.role}</p>
              <h2>{person.name}</h2>
              <p>{person.bio}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="interior-cta">
        <p className="eyebrow light">You Do Not Have To Do Life Alone</p>
        <h2>There Is A Place<br />For You <em>Here.</em></h2>
        <div><Link className="button button-light" href="/#visit">Plan your visit <span aria-hidden="true">↗</span></Link><Link className="text-link light" href="/beliefs">What we believe <span aria-hidden="true">→</span></Link></div>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
