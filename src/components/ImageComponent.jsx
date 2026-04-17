import { Image } from "@imagekit/react";
import PropTypes from "prop-types";

const ImageComponent = ({ src, classname, w, h, alt }) => {
  return (
    <div>
      <Image
        className={classname}
        urlEndpoint="https://ik.imagekit.io/yogesh13"
        src={src}
        width={w}
        height={h}
        alt={alt}
        loading="lazy"
        lqip={{ active: true, quality: 20 }}
        transformation={[{ width: w, height: h }]}
      />
    </div>
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string,
  classname: PropTypes.string,
  w: PropTypes.string,
  h: PropTypes.string,
  alt: PropTypes.string,
};

export default ImageComponent;
