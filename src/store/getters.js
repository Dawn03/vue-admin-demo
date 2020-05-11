const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  __sid: state => state.user.__sid,
  avatar: state => state.user.avatar,
  username: state => state.user.username
}
export default getters
