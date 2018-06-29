import { asyncComponent } from "react-async-component";

const Upload = asyncComponent({
  resolve: () => import(/* webpackChunkName: "UploadPage" */ "./index"),
});

export default Upload;
