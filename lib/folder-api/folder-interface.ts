export default interface Folder {
  id: string;
  title: string;
  taskOrderIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
