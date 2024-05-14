import React, { useEffect, useState } from "react";
import image1 from "@/public/assets/Text Slider/image1.png";
import image2 from "@/public/assets/Text Slider/image2.png";
import image3 from "@/public/assets/Text Slider/image3.png";
import { useKeenSlider } from "keen-slider/react";
import Slide_Content from "./Slide_Content";
import styles from "@/styles/Text_Slider.module.css";
import { Carousel } from "react-bootstrap";
import Image from "next/image";

const Text_slider = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Check if window is defined (not during SSR)
    if (typeof window !== "undefined") {
      // Function to handle resizing
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Initial call to set initial window size
      handleResize();

      // Event listener for window resize
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  let preview = 1.2;
  let padding_class = "px-8";
  if (windowSize.width >= 500 && windowSize.width <= 900) {
    preview = 2;
    padding_class = "px-20";
  } else if (windowSize.width >= 900 && windowSize.width<=1600) {
    preview = 2;
    padding_class = "px-80";
  } else if (windowSize.width >= 1600) {
    preview = 1.4;
    padding_class = "px-80";
  }
  
  // const [sliderRef] = useKeenSlider({
  //   loop: true, // Set loop to false
  //   mode: "free-snap",
  //   slides: {
  //     perView: preview,
  //     spacing: 5,
  //     center: true,
  //   }
  // });
  // const animation = { duration: 30000, easing: (t) => t }

  // const [sliderRef] = useKeenSlider({
  //   loop: true,
  //   slides:{
  //     perView:preview,
  //     spacing:true,
  //     center:true
  //   },
  //   renderMode: "performance",
  //   drag: true,
  //   created(s) {
  //     s.moveToIdx(5, true, animation)
  //   },
  //   updated(s) {
  //     s.moveToIdx(s.track.details.abs + 5, true, animation)
  //   },
  //   animationEnded(s) {
  //     s.moveToIdx(s.track.details.abs + 5, true, animation)
  //   },
  // })

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides:{
        perView:preview,
        spacing:5,
        center:true,
      }
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <>
      {/* <div className="hidden md:block lg:block xl:block 2xl:block">
        <div
          ref={sliderRef}
          className={`keen-slider ${styles["main_slider"]} ${padding_class}`}
        >
          <div className={` keen-slider__slide ${styles["slider"]}`}>
            <Slide_Content 
              image={image1}
              text="This is a simple quote. Add your message here."
              name="Name"
              title="Title here"
            />
          </div>
          <div className={` keen-slider__slide`}>
            <Slide_Content
              image={image2}
              text="This is a simple quote. Add your message here."
              name="Name"
              title="Title here"
            /> 
          </div>
          <div className={` keen-slider__slide`}>
            <Slide_Content
              image={image3}
              text="This is a simple quote. Add your message here."
              name="Name"
              title="Title here"
            />
          </div>
          <div className={` keen-slider__slide`}>
            <Slide_Content
              image={image1}
              text="This is a simple quote. Add your message here."
              name="Name"
              title="Title here"
            />
          </div>
          <div className={` keen-slider__slide`}>
            <Slide_Content
              image={image2}
              text="This is a simple quote. Add your message here."
              name="Name"
              title="Title here"
            />
          </div>
          <div className={` keen-slider__slide`}>
            <Slide_Content
              image={image3}
              text="This is a simple quote. Add your message here."
              name="Name"
              title="Title here"
            />
          </div>
        </div>
      </div> */}
      <div className="hidden md:block lg:block xl:block 2xl:block">
        <div
          ref={sliderRef}
          className={`keen-slider ${styles["main_slider"]} ${padding_class}`}
        >
          <div className={` keen-slider__slide `}>
            <div className={styles.test_container1}>
              <div className={styles.test_text}>
                This is a sample quote. Add your message here.
              </div>
              <div className={styles.test_user}>
                &ndash;&ndash;Name,Title Here
              </div>
            </div>
          </div>
          <div className={` keen-slider__slide`}>
            <div className={styles.test_container2}>
              <div className={styles.test_text}>
                This is a sample quote. Add your message here.
              </div>
              <div className={styles.test_user}>
                &ndash;&ndash;Name,Title Here
              </div>
            </div>
          </div>
          <div className={` keen-slider__slide`}>
            <div className={styles.test_container3}>
              <div className={styles.test_text}>
                This is a sample quote. Add your message here.
              </div>
              <div className={styles.test_user}>
                &ndash;&ndash;Name,Title Here
              </div>
            </div>
          </div>
          <div className={` keen-slider__slide`}>
            <div className={styles.test_container1}>
              <div className={styles.test_text}>
                This is a sample quote. Add your message here.
              </div>
              <div className={styles.test_user}>
                &ndash;&ndash;Name,Title Here
              </div>
            </div>
          </div>
          <div className={` keen-slider__slide`}>
            <div className={styles.test_container2}>
              <div className={styles.test_text}>
                This is a sample quote. Add your message here.
              </div>
              <div className={styles.test_user}>
                &ndash;&ndash;Name,Title Here
              </div>
            </div>
          </div>
          <div className={` keen-slider__slide`}>
            <div className={styles.test_container3}>
              <div className={styles.test_text}>
                This is a sample quote. Add your message here.
              </div>
              <div className={styles.test_user}>
                &ndash;&ndash;Name,Title Here
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden lg:hidden xl:hidden 2xl:hidden px-16 ">
        <Carousel>
          <Carousel.Item>
            <div className={styles.mobile_container}>
              <div className={styles.mobile_image1}>
                <div className={styles.mobile_text}>
                  "This is a simple quote. Add your message here."
                </div>
                <div className={styles.mobile_user}>
                  &ndash;&ndash;Name,Title here
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles.mobile_container}>
              <div className={styles.mobile_image2}>
                <div className={styles.mobile_text}>
                  "This is a simple quote. Add your message here."
                </div>
                <div className={styles.mobile_user}>
                  &ndash;&ndash;Name,Title here
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles.mobile_container}>
              <div className={styles.mobile_image3}>
                <div className={styles.mobile_text}>
                  "This is a simple quote. Add your message here."
                </div>
                <div className={styles.mobile_user}>
                  &ndash;&ndash;Name,Title here
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Text_slider;

// import React, { useEffect, useState } from "react";
// import image1 from "@/pages/assets/Text Slider/image1.png";
// import image2 from "@/pages/assets/Text Slider/image2.png";
// import image3 from "@/pages/assets/Text Slider/image3.png";
// import { useKeenSlider } from "keen-slider/react";
// import Slide_Content from "./Slide_Content";
// import styles from "@/styles/Text_Slider.module.css";

// const Text_slider = () => {
//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });
//   const [highlightedIndex, setHighlightedIndex] = useState(0);

//   useEffect(() => {
//     // Check if window is defined (not during SSR)
//     if (typeof window !== "undefined") {
//       // Function to handle resizing
//       const handleResize = () => {
//         setWindowSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       };

//       // Initial call to set initial window size
//       handleResize();

//       // Event listener for window resize
//       window.addEventListener("resize", handleResize);

//       // Cleanup the event listener on component unmount
//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   let preview = 1;
//   let padding_class = "px-4";
//   if (windowSize.width >= 500 && windowSize.width <= 900) {
//     preview = 2;
//     padding_class = "px-20";
//   } else if (windowSize.width >= 900) {
//     preview = 2;
//     padding_class = "px-80";
//   }
//   const [sliderRef] = useKeenSlider({
//     loop: true,
//     mode: "free-snap",
//     slides: {
//       perView: preview,
//       spacing: 5,
//     },
//     center: (index) => {
//       setHighlightedIndex(index);
//     },
//   });

//   return (
//     <div
//       ref={sliderRef}
//       className={`keen-slider ${styles["main_slider"]} ${padding_class} `}
//     >
//       {[image1, image2, image3,image1].map((image, index) => (
//         <div
//           key={index}
//           className={`keen-slider__slide ${
//             index === highlightedIndex ? styles.highlighted : styles.faded
//           } ${styles["slider"]}`}
//         >
//           <Slide_Content
//             image={image}
//             text="This is a simple quote. Add your message here."
//             name="Name"
//             title="Title here"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Text_slider;
