import type { Metadata } from "next";
import { mensHealthySexualityUrl } from "../../site-data";
import { RecoveryGroupPage } from "../recovery-groups";

export const metadata: Metadata = {
  title: "Men’s Healthy Sexuality | Vineyard Florence Church",
  description: "A group of men who have chosen to bond together to live connected, live sober and live free of compulsive sexual behaviors.",
};

export default function MensHealthySexualityPage() {
  return (
    <RecoveryGroupPage
      slug="mens-healthy-sexuality"
      eyebrow="Recovery · For Men"
      title={["Men’s Healthy", "Sexuality."]}
      intro="No matter what your destructive sexual behaviors, your faith walk or your church attendance, we are excited you are seeking freedom and choosing hope."
    >
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">01 — What MHS Is About</span><h2>Live Connected.<br /><em>Live Free.</em></h2></div>
        <div className="info-body">
          <p className="info-callout">Join us. It does not matter where you live. You are here for a reason. Begin the journey to becoming a better man.</p>
          <p>We are a group of men who have chosen to bond together to live connected, live sober and live free.</p>
          <p>We live free: free of fear, beyond just being sober, free of compulsions, free of secrets, free of shame, because we are free to share our needs and to belong. We have learned we cannot do this alone. We tried… repeatedly. It didn’t work.</p>
          <p>We are a combination of experienced leaders, new guys just figuring it out, and everything in between, dedicated to living healthy lives free of compulsive sexual behaviors and their impacts.</p>
          <dl className="info-details">
            <div><dt>Contact</dt><dd><a href="mailto:menshealthysexuality@gmail.com">menshealthysexuality@gmail.com</a></dd></div>
          </dl>
          <div className="info-actions">
            <a className="button button-dark" href="mailto:menshealthysexuality@gmail.com">Email For More Information <span aria-hidden="true">→</span></a>
            <a className="text-link" href={mensHealthySexualityUrl} target="_blank" rel="noreferrer">Visit The MHS Website <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </RecoveryGroupPage>
  );
}
