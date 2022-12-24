export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": config.apiSecret,
      "X-RapidAPI-Host": config.public.apiHost,
    },
  };

  return fetch(
    config.public.apiBase + "/list?from=0&size=20&tags=under_30_minutes",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
});
