function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // required on Render
    sameSite: "None", // allow cross-site cookies
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
}

function clearAuthCookie(res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None"
  });
}

module.exports = {
  setAuthCookie,
  clearAuthCookie
};
