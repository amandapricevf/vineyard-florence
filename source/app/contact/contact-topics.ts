import topics from "./contact-topics.json";

/**
 * Each contact topic is its own Netlify form, so its notifications can go to
 * the person responsible for it. The list lives in `contact-topics.json`
 * because the Netlify export script reads it too; to add a topic, add one
 * entry there and link to it with `contactTopicLink("<topic>")`.
 *
 * `formName` is what church staff see in Netlify Forms, so it must say plainly
 * what the form is about.
 */
export type ContactTopic = (typeof topics)[number];

/** Netlify form for questions that are not about a specific topic. */
export const generalContactFormName = "contact-us-general-questions";

export const contactTopics: ContactTopic[] = topics;

export function findContactTopic(id: string | null): ContactTopic | undefined {
  return id ? contactTopics.find((topic) => topic.topic === id) : undefined;
}
