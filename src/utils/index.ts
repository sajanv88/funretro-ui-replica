export const copyLink = async function(customLink: string = "") {
  const link = window.location.href;
  console.log(link);
  try {
    await navigator.clipboard.writeText(link);
  } catch (e) {
    throw e;
  }
};
