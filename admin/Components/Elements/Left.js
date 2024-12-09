import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "react";
import { PanelBody, TabPanel, Button, RangeControl } from "@wordpress/components";
import { tabs } from "../../utils/Option";
import MediaUpload from "../../../my-components/MediaUpload";
import useWPAjax from "../../utils/useWPAjax";
const dataFetched = new CustomEvent("dataFetched");

const Left = () => {
  const [logoData, setLogoData] = useState({});

  const { items = [{ url: "" }], settings = { slidesView: { desktop: 3, tablet: 2, mobile: 1 } } } = logoData || {};

  const { data, saveData, isLoading } = useWPAjax("bls_ph_brand_logo_data", { nonce: window.wpApiSettings.nonce }, true);
  const { slidesView } = settings

  // Get first data
  useEffect(() => {
    if (!isLoading && data) {
      setLogoData({ ...data });
      window.dispatchEvent(dataFetched);
    }
  }, [data, isLoading]);

  // Add new item to items array
  const addItem = () => {
    const newItems = [
      ...items,
      {
        url: "",
      },
    ];

    // Update state with new items array
    setLogoData({ ...logoData, items: newItems });

    // Save updated data to the database
    saveData({ data: JSON.stringify({ ...logoData, items: newItems }) });
  };


  // Remove Slider
  const removeItem = (index) => {
    const removeItem = [...items];
    removeItem.splice(index, 1);
    setLogoData({ items: removeItem });
    saveData({ data: JSON.stringify({ ...logoData, items: removeItem }) });

  };

  // Card Duplicate
  const duplicateItem = (index) => {
    const newItems = [
      ...items.slice(0, index),
      { ...items[index] },
      ...items.slice(index),
    ];
    setLogoData({ items: newItems });
    saveData({ data: JSON.stringify({ ...logoData, items: newItems }) });
  };

  // Update the selected image in the specific item
  const onImageSelect = (url, index) => {

    const updatedItems = items?.map((item, i) =>
      i === index ? { ...item, url: url } : item
    );
    setLogoData({ ...logoData, items: updatedItems });

    // Save updated data to the database
    saveData({ data: JSON.stringify({ ...logoData, items: updatedItems }) });
  };


  return (
    <div className="left">
      <TabPanel className="phTabPanel" activeClass="activeTab" tabs={tabs}>
        {(tab) => (
          <>
            {"General" === tab.name && <>
              <PanelBody className="phPanelBody" title="Items" initialOpen={false}>
                {items?.map((item, index) => (
                  <PanelBody className="phPanelBody childPanelBody" title={`Item ${index + 1}`} initialOpen={false} key={index}>
                    <MediaUpload value={item?.url} onChange={(url) => onImageSelect(url, index)} />

                    <Button className="addBtn removeBtn" onClick={() => removeItem(index)}> {__("Remove Item", "brand-logo-slider")}
                    </Button>

                    <Button className="addBtn duplicateBtn" onClick={() => duplicateItem(index)}> {__("Duplicate Item", "brand-logo-slider")}</Button>
                  </PanelBody>
                ))}

                <Button className="addBtn" onClick={addItem}> {__("Add New Item", "brand-logo-slider")}</Button>
              </PanelBody>

              <PanelBody className="phPanelBody settings" title="Settings" initialOpen={false}>

                <RangeControl
                  className='toggleControl'
                  label={__("Show Item", "brand-logo-slider")}
                  value={slidesView?.desktop}
                  onChange={(val) => {
                    const updatedSettings = {
                      ...settings,
                      slidesView: { ...slidesView, desktop: val },
                    };

                    // Update state with the new slidesView settings
                    setLogoData({ ...logoData, settings: updatedSettings });

                    // Save updated data to the database
                    saveData({ data: JSON.stringify({ ...logoData, settings: updatedSettings }) });
                  }}
                  min={2}
                  max={10}
                />


              </PanelBody>
            </>}

            {"style" === tab.name && (
              <PanelBody className="phPanelBody" title="Style" initialOpen={false}>
                <h1>Style</h1>
              </PanelBody>
            )}
          </>
        )}
      </TabPanel>
    </div>
  );
};

export default Left;

