import { asyncComponent } from "react-async-component";

export const Upload = asyncComponent({
  resolve: () => import(/* webpackChunkName: "UploadPage" */ "./index")
});
