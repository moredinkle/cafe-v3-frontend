import { reactive } from 'vue';

export type AlertIcon = "error" | "warning" | "success" | "info" | "";

interface AlertState {
  visible: boolean;
  message: string;
  color: string;
  icon: AlertIcon;
}

const useAlert = () => {
  const alertState = reactive<AlertState>({
    visible: false,
    message: '',
    color: '',
    icon: '',
  });

  const showAlert = (msg: string, iconType: AlertIcon = 'info', color: string = 'bg-blue-600', timeout: number = 2000) => {
    alertState.visible = true;
    alertState.message = msg;
    alertState.color = color;
    alertState.icon = iconType;
    console.log('llega')
    setTimeout(() => {
      alertState.visible = false;
      console.log('sale')
    }, timeout);
  };

  const hideAlert = () => {
    alertState.visible = false;
  };

  return {
    alertState,
    showAlert,
    hideAlert
  };
};

export default useAlert;

