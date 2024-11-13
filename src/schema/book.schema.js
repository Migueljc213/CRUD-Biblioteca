import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Titlé é obrigatório"),
  author: z.string().min(1, "author é obrigatório"),
});
export default bookSchema ;
