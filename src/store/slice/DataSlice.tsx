import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICategory {
  id: number;
  category_name: string;
}

interface IType {
  id: number;
  book_pdf: string;
  book_name: string;
  book_image: string;
  book_author: string;
  category: ICategory;
  publication_year: number;
  loading_time: string;
  description: string;
  like_count: number;
}

interface IData {
  data: IType[];
}

const initialState: IData = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IType[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
