// ScComponent.js

import React, { useEffect, useRef } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { getActionResult } from '../utils/sc/scComponentFunction';
import ScTable from '../utils/sc/scTable';

const ScComponent = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const ScProcessor = ({ sc }) => {
    const datasets = [];
    for (let i = 0; i < 22400; i += 56) {
      const isSameButton = sc[i] === sc[i + 22400];
      if (isSameButton) {
        const dataset = [
          [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]],
          [sc[i + 22401], sc[i + 22405], sc[i + 22409], sc[i + 22413], sc[i + 22417]],
        ];
        const firstArrayValue = dataset[0].find(value => value !== "");
        const secondArrayValue = dataset[1].find(value => value !== "");
        datasets.push([
          (i / 56) + 1,
          firstArrayValue || "<未登録>",
          secondArrayValue || "<未登録>",
        ]);
      } else {
        const actionResult = getActionResult(sc, i);
        datasets.push([(i / 56) + 1, ...actionResult]);
      }
    }
    return datasets;
  };

  const datasets = ScProcessor({ sc: fileContent?.if_config?.sc || [] });

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const wireless1Ref = useRef(null);
  const wireless2Ref = useRef(null);
  const wiredRef = useRef(null);

  return (
    <div>
      {file && (
        <div>
          <Header />
          <div id="sidebar">
            {/* サイドバー */}
            <ul><b>
              <li onClick={() => scrollToRef(wireless1Ref)}>無線① WCシリーズ</li>
              <li onClick={() => scrollToRef(wireless2Ref)}>無線② UTW/WCシリーズ</li>
              <li onClick={() => scrollToRef(wiredRef)}>有線</li>
            </b></ul>
          </div>
          <div id="main-content">
            <h2 ref={wireless1Ref}>Sc Page</h2>
            <p>File Name: {file.type}</p>
            <h3>無線① WCシリーズ(400ペア)</h3>
            {datasets.map((data, index) => (
              <div key={index}>
                <ScTable id={data[0]} call={data[1]} back={data[2]} />
              </div>
            ))}
            <h3 ref={wireless2Ref}>無線② UTW/WCシリーズ(1~16)</h3>
            <ScTable />
            <h3 ref={wiredRef}>有線(1~16)</h3>
            <ScTable />
          </div>
        </div>
      )}
      {!file && <h2>Sc Page</h2>}
    </div>
  );
};

export default ScComponent;
