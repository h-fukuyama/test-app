import React, { useEffect,useRef } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { ScProcessor1, ScProcessor2 } from './ScComponent'
import { ScTable1, ScTable2 } from '../utils/sc/scTable';
import { MenuTable } from '../utils/menu/menuTable';
import { MenuProcessor3 } from './MenuComponent';

const MainComponent = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const staffCall = useRef(null);
  const oneTouch = useRef(null);
  const localTimer = useRef(null);

  const datasets1 = ScProcessor1({ sc: fileContent?.if_config?.sc || [] });
  const datasets2 = ScProcessor2({ sc: fileContent?.if_config?.sc || [] });

  const datasets3 = MenuProcessor3({ menu: fileContent?.if_config?.menu || [] });

  // const datasets4 = LtProcessor({ lt: fileContent?.if_config?.lt || [] });

  return (
    <div>
      {file && (
        <div>
          <Header />
          <div id="sidebar">
            {/* サイドバー */}
            <ul><b>
              <li onClick={() => scrollToRef(staffCall)}>スタッフコール</li>
              <li onClick={() => scrollToRef(oneTouch)}>ワンタッチボタン</li>
              <li onClick={() => scrollToRef(localTimer)}>ローカルタイマー</li>
            </b></ul>
          </div>
          <div id="main-content">
            <h2>Main Page</h2>
            <p>File Name: {file.name}</p>
            {fileContent? (
              <div>
                <h2 ref={staffCall}>スタッフコール(両方未接続の設定以外を表示)</h2>
                <h3>無線① WCシリーズ(101~400)</h3>
                {datasets1.map((data, index) => (
                  <div key={index}>
                    {(data[1] !== "<未登録>" || data[2] !== "<未登録>") && (
                      <ScTable1 id={data[0]} button={data[0]+100} call={data[1]} back={data[2]} />
                    )}
                  </div>
                ))}
                <h3>無線② UTW/WCシリーズ(1~16)</h3>
                  {datasets2.map((data, index) => (
                    <div key={index}>
                      {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                        <ScTable1 id={data[0]} button={data[0]} call={data[1]} back={data[2]} />
                      )}
                    </div>
                  ))}
                  <h3>有線(1~16)</h3>
                  {datasets2.map((data, index) => (
                    <div key={index}>
                      {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                        <ScTable2 id={data[0]} call={data[1]} />
                      )}
                    </div>
                  ))}
                  <h2 ref={oneTouch}>登録済みワンタッチボタン</h2>
                  {datasets3.map((data, index) => (
                    <div key={index}>
                      {(data[1] !== "<未登録>" || data[2] !== "") && (
                        <MenuTable id={data[0]} title={data[1]} call={data[2]} />
                      )}
                    </div>
                  ))}
                  <h2 ref={localTimer}>登録済みローカルタイマー</h2>
                  {/* {datasets4.map((data, index) => (
                    <div key={index}>
                      {(data[1] !== "<未登録>" || data[2] !== "") && (
                        <MenuTable id={data[0]} title={data[1]} call={data[2]} />
                      )}
                    </div>
                  ))} */}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          </div>
        )}
        {!file && <h2>Main Page</h2>}
    </div>
  );
};

export default MainComponent;
