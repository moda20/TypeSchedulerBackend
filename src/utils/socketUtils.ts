import { MiscNotificationTopicsList } from "@typesDef/api/websocket";

export const forceToArray = (input: string) => {
  try {
    const arrayable = JSON.parse(input);
    return Array.isArray(arrayable) ? arrayable : [arrayable];
  } catch (err) {
    return [input];
  }
};

const acceptedTopics = [
  ...MiscNotificationTopicsList,
  /^JOB_EVENT_([0-9]+)_([^\r\n\s_]+)$/gi,
];
export const isAcceptedTopic = (topic: string) => {
  return acceptedTopics.some((e) => topic.match(e));
};
