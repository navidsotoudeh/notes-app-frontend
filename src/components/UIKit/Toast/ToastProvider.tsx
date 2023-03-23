import { Slide, ToastContainer } from 'react-toastify'

const ToastProvider: React.FC = (props) => {
  return <ToastContainer {...props} transition={Slide} limit={2} />
}
ToastProvider.defaultProps = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: false,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
  rtl: true,
  closeOnClick: true,
  newestOnTop: true,
  draggable: false,
  icon: false,
  enableMultiContainer: true,
  limit: 1,
}
export default ToastProvider
