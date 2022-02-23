import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import "./Dashboard.scss";
import {
  CCol,
  CContainer,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CAlert,
  CFormSelect,
  CSpinner,
} from "@coreui/react";
import {
  createBossKill,
  getBossesOfRaid,
} from "../../services/bosskillService";
import { getAllRaids } from "../../services/raidsService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const KillFeedCreateNewView = () => {
  // const editorRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [titleErrorVisible, setTitleErrorVisible] = useState(false);
  const [contentErrorVisible, setContentErrorVisible] = useState(false);
  const [raidSlugErrorVisible, setRaidSlugErrorVisible] = useState(false);
  const [raids, setRaids] = useState([]);
  const [raidSlug, setRaidSlug] = useState("");
  const [difficultyErrorVisible, setDifficultyErrorVisible] = useState(false);
  const [difficultySelect, setDifficultySelect] = useState("");
  const [bossSlugErrorVisible, setBossSlugErrorVisible] = useState(false);
  const [bossesOfRaid, setBossesOfRaid] = useState([]);
  const [bossSlug, setBossSlug] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
    killshot: "",
  });

  useEffect(() => {
    getRaids();
    setPost({
      title: "",
      content: "",
      killshot: "",
    });
    return () => {
      setPost({
        title: "",
        content: "",
        killshot: "",
      });
    };
  }, []);

  const getRaids = async () => {
    const response = await getAllRaids(setRaids);
    // const slugs = await response.data;
    // setRaids(slugs);
  };

  const handleRaidSlugSelect = async (event) => {
    setRaidSlug(event.target.value);
    getBossesOfRaidSelected(event.target.value);
  };

  const handleDifficultySelect = (event) => {
    setDifficultySelect(event.target.value);
  };

  const getBossesOfRaidSelected = async (raid) => {
    const response = await getBossesOfRaid(raid);
    const bosses = await response.data;
    setBossesOfRaid(bosses);
  };

  const handleBossSlugChange = (event) => {
    setBossSlug(event.target.value);
    // console.log(bossSlug);
  };

  const handleChange = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  function handleEditorChange({ html, text }) {
    // console.log("handleEditorChange", html, text);
    setPost({ ...post, content: text });
    // console.log(post.content);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (raidSlug === "Raid Slug" || raidSlug === "") {
      setRaidSlugErrorVisible(true);
      return;
    }
    if (bossSlug === "" || bossSlug === "Boss Slug") {
      setBossSlugErrorVisible(true);
      return;
    }
    if (difficultySelect === "Difficulty" || difficultySelect === "") {
      setDifficultyErrorVisible(true);
      return;
    }
    if (post.title === "") {
      setTitleErrorVisible(true);
      return;
    }
    if (post.content === "") {
      setContentErrorVisible(true);
      return;
    }
    setIsLoading(true);
    // console.log(post);
    const response = await createBossKill(
      post,
      raidSlug,
      bossSlug,
      difficultySelect
    );
    setIsLoading(false);
    navigate("/dashboard/killfeed");
    setPost({
      title: "",
      content: "",
      killshot: "",
    });
    return response;
  };
  // console.log(difficultySelect);

  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer fluid>
          <CRow className="mb-3">
            <CCol>
              <CForm>
                <CRow>
                  <CCol>
                    <CFormSelect
                      aria-label="Raid Slug"
                      onChange={handleRaidSlugSelect}
                    >
                      <option>Raid Slug</option>
                      {(() => {
                        let list = [];
                        for (let i = 0; i < raids.length; i++) {
                          const slug = raids[i].raid_slug;
                          list.push(
                            <option key={raids[i].raid_slug} value={slug}>
                              {slug}
                            </option>
                          );
                        }
                        return list;
                      })()}
                    </CFormSelect>
                    {raidSlugErrorVisible && (
                      <div>
                        <br />
                        <CAlert color="warning">Raid ungültig!</CAlert>
                      </div>
                    )}
                  </CCol>
                  <CCol>
                    <CFormSelect
                      aria-label="Raid Slug"
                      onChange={handleBossSlugChange}
                    >
                      <option>Boss Slug</option>
                      {(() => {
                        let list = [];
                        for (let i = 0; i < bossesOfRaid.length; i++) {
                          const slug = bossesOfRaid[i].boss_slug;
                          list.push(
                            <option
                              key={bossesOfRaid[i].boss_slug}
                              value={slug}
                            >
                              {slug}
                            </option>
                          );
                        }
                        return list;
                      })()}
                    </CFormSelect>
                    {/* <CFormInput
                      onChange={handleBossSlugChange}
                      value={bossSlug}
                      name="boss_slug"
                      className="form-control"
                      placeholder="boss-slug"
                      type="text"
                      required
                    /> */}
                    {bossSlugErrorVisible && (
                      <div>
                        <br />
                        <CAlert color="warning">Boss Slug eingeben!</CAlert>
                      </div>
                    )}
                  </CCol>
                  <CCol>
                    <CFormSelect
                      aria-label="Difficulty"
                      onChange={handleDifficultySelect}
                    >
                      <option>Difficulty</option>
                      <option value="heroic">heroic</option>
                      <option value="mythic">mythic</option>
                    </CFormSelect>
                    {difficultyErrorVisible && (
                      <div>
                        <br />
                        <CAlert color="warning">Difficulty auswählen!</CAlert>
                      </div>
                    )}
                  </CCol>
                  <CCol>
                    <CFormInput
                      onChange={handleChange}
                      value={post.killshot}
                      name="killshot"
                      className="form-control"
                      placeholder="Screenshot URL"
                      type="text"
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <div className="mb-3">
                    <CFormLabel htmlFor="title">Titel</CFormLabel>
                    <CFormInput
                      onChange={handleChange}
                      value={post.title}
                      name="title"
                      className="form-control"
                      placeholder="title"
                      type="text"
                      required
                    />
                    {titleErrorVisible && (
                      <div>
                        <br />
                        <CAlert color="warning">Titel eingeben!</CAlert>
                      </div>
                    )}
                  </div>
                </CRow>

                <CRow>
                  <div className="mb-3">
                    <MdEditor
                      style={{ height: "500px" }}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={handleEditorChange}
                    />
                  </div>
                  {contentErrorVisible && (
                    <div>
                      <br />
                      <CAlert color="warning">Inhalt eingeben!</CAlert>
                    </div>
                  )}
                </CRow>
                {!isLoading ? (
                  <CButton type="submit" color="dark" onClick={handleSubmit}>
                    Abschicken
                  </CButton>
                ) : (
                  <CButton color="dark" disabled>
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Abschicken
                  </CButton>
                )}
              </CForm>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default KillFeedCreateNewView;
