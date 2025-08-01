import Image from "next/image";

// lead

function AdsComponents(props) {
  return (
    <div>
      <Image
        src={props.image}
        width={props.width || 300}
        height={props.height || 250}
        alt="Lead News"
        className={props.className}
      />
    </div>
  );
}

export default AdsComponents;
