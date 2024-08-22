import PostModel from "@/app/models/PostData";
import { Form, FormikProps } from "formik";
import Link from "next/link";
import InputControl from "../controls/Input";
import Spinner from "../../shared/Spinner";
import { MdOutlineDescription, MdOutlineSubtitles } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { BiSolidCategory } from "react-icons/bi";
import SelectBoxData from "../controls/SelectBoxData";
import CheckBox from "../controls/checkbox";
import { VscSymbolKeyword } from "react-icons/vsc";
import TextAreaControl from "../controls/textArea";
import { PiFunnelSimple } from "react-icons/pi";
import { RiHashtag } from "react-icons/ri";
import RichText from "../controls/RichText";
type PostFormProps = FormikProps<PostModel> & {
  post: PostModel;
  page: number;
};

export default function InnerPostForm(params: PostFormProps) {
  const onChange = (value: string | undefined) => {
    params.setFieldValue("content", value);
  };
  return (
    <div className="flex  py-2 px-2 grid-cols-6">
      <Form className="flex flex-col gap-4 mt-44">
        <InputControl
          label="Post Title:"
          id="title"
          name="title"
          type="text"
          placeholder="Enter Title..."
          icon={MdOutlineSubtitles}
        />
        <InputControl
          label="Slug:"
          id="slug"
          name="slug"
          type="text"
          placeholder="Enter slug..."
          icon={RiHashtag}
        />
        <SelectBoxData
          label="Category:"
          id="category_id"
          name="category_id"
          icon={BiSolidCategory}
          fetchUrl={`url=list/article-categories`}
          firstOption={"Please Select"}
        />
        <CheckBox
          label="isPublished:"
          id="is_published"
          name="is_published"
          type="checkbox"
          icon={LuImagePlus}
        />
        <InputControl
          label="Keywords:"
          id="keywords"
          name="keywords"
          type="text"
          placeholder="Enter keywords..."
          icon={VscSymbolKeyword}
        />
        <InputControl
          label="Description:"
          id="description"
          name="description"
          type="text"
          placeholder="Enter description..."
          icon={MdOutlineDescription}
        />
        <TextAreaControl
          label="Summary:"
          id="summary"
          name="summary"
          placeholder="Enter summary..."
          icon={PiFunnelSimple}
        />

        <InputControl
          label="Image Url:"
          id="image_url"
          name="image_url"
          type="text"
          placeholder="Enter Image Address..."
          icon={LuImagePlus}
        />
        <RichText
          onChange={onChange}
          value={params?.post?.content}
          placeHolder="tell your story..."
        />
        <div className="flex justify-center mt-16 py-5 gap-2">
          <button
            disabled={params.isSubmitting}
            className="bg-blue-500 px-5 py-2 rounded-md"
            type="submit"
          >
            {params?.post ? "Edit Post" : "Add Post"}
            {params.isSubmitting && <Spinner />}
          </button>
          <Link
            href={`/admin/post?page=${params.page}`}
            as={`/admin/post?page=${params.page}`}
            className="bg-red-500 px-5 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
