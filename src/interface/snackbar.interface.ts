export interface ISnackbar {
  open: boolean;
  message: string;
  status: "success" | "warning" | "danger";
}
