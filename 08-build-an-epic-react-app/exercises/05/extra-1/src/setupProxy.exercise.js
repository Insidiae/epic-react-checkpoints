function proxy(app) {
  // 💯 Add the redirect handler here
  app.get(/^\/$/, (req, res) => {
    return res.redirect("/discover");
  });
}

module.exports = proxy;
