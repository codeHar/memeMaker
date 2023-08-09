import useImage from "use-image";
import dustbinImg from "/assets/dustbin.png";
import { Image } from "react-konva";
import { Html } from "react-konva-utils";

const Dustbin = ({ pos, deleteSomething }) => {
  // const [dustbin] = useImage(dustbinImg);

  return (
    <Html>
      <div className="relative left-[250px] top-3 bg-gray-400 p-1 rounded-md cursor-pointer" onClick={deleteSomething}>
        <img src={dustbinImg} width={30} height={30} />
      </div>
    </Html>
    // <Image
    //   image={dustbin}
    //   onClick={deleteSomething}
    //   width={30}
    //   height={30}
    //   x={250-15}
    //   y={20}
    // />
  );
};

export default Dustbin;
