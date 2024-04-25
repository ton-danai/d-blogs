export default interface IMessageModal {
  isOpen: boolean;
  header: string | null;
  detail: string | null;
  btnText: string | null;
  onClick: () => void | undefined;
}
