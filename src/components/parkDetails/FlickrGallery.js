import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import InfiniteScroll from "react-infinite-scroll-component";

const FlickrGallery = props => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [lastItemIndex, setLastItemIndex] = useState(15);
  const [hasMore, setHasMore] = useState(true);

  const openLightbox = useCallback((e, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleScroll = async () => {
    const adder = 15;
    let last = lastItemIndex + adder;
    let p = page + 1;
    await props.getFlickrPictures(p);
    setPage(p);
    setLastItemIndex(last);
  };

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={lastItemIndex}
        next={handleScroll}
        height={window.innerHeight - window.innerHeight * 0.16}
        hasMore={hasMore}
        endMessage={
          <div className="d-flex justify-content-center">
            <h4>that's all folks</h4>
          </div>
        }
      >
        <Gallery photos={props.pictures} onClick={openLightbox} />
      </InfiniteScroll>
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={props.pictures.map(p => ({
                src: p.src,
                caption: p.caption
              }))}
            />
          </Modal>
        )}
      </ModalGateway>
    </React.Fragment>
  );
};

export default FlickrGallery;
