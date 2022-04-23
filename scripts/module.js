import { formatDistanceToNowStrict } from "date-fns";

const module = (date) => {
  const when = formatDistanceToNowStrict(date);
  return when;
};

export default module;
