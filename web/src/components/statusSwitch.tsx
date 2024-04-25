import { PostStatusEnums } from "../utils/enums";

interface ISwitch {
  value: string;
  onChange: (value: PostStatusEnums) => undefined | void;
}

export default function Switch(props: ISwitch) {
  const baseCss =
    "px-3 h-10 flex justify-center items-center shadow cursor-pointer md:w-20 w-1/2";
  const inactiveCss = " bg-gray-200 text-white";

  const draftCss = () => {
    let css = "";
    if (props.value === PostStatusEnums.DRAFT) {
      css += " bg-yellow-400 text-white";
    } else {
      css += inactiveCss;
    }

    return baseCss + css;
  };

  const publishCss = () => {
    let css = "";

    if (props.value === PostStatusEnums.PUBLISHED) {
      css += " bg-green-400 text-white";
    } else {
      css += inactiveCss;
    }

    return baseCss + css;
  };

  return (
    <div className="flex w-full">
      <div
        className={`rounded-l-md ${draftCss()}`}
        onClick={() => props.onChange(PostStatusEnums.DRAFT)}
      >
        Draft
      </div>
      <div
        className={`rounded-r-md ${publishCss()}`}
        onClick={() => props.onChange(PostStatusEnums.PUBLISHED)}
      >
        Publish
      </div>
    </div>
  );
}
