import React, { useEffect } from "react";
import { Banner, Cafe, RoomCategory, Rooms, SideBar } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCafeQuery, useGetUserQuery } from "@/store/apiRTK";
import { useAppDispatch } from "@/store/hooks/hooks";
import {
  setCafeCreated,
  updateCafeInfo,
} from "@/store/bookingSlice/bookingSlice";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Location setting
  const location = useLocation().search.substring(1);
  localStorage.setItem("location", location);

  // ---------------------------------------------------
  // Variables
  const token = localStorage.getItem("token") + "";

  // ===================================================
  // API Requests

  const {
    // data: userData,
    isSuccess: userSuccess,
    isLoading: userLoading,
  } = useGetUserQuery(token);

  // ---------------------------------------------------

  const {
    data: CafeData,
    isSuccess: CafeSuccess,
    isLoading: CafeLoading,
  } = useGetCafeQuery(token);

  // ===================================================

  // Check localStorage has token
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  // Check User
  useEffect(() => {
    if (!userLoading)
      if (!userSuccess) {
        navigate("/login");
        localStorage.removeItem("token");
      }
  }, [userLoading]);

  // Check Cafe
  useEffect(() => {
    if (!CafeLoading)
      if (!CafeSuccess) {
        navigate("/?setting");
        dispatch(setCafeCreated(CafeSuccess));
      } else {
        dispatch(updateCafeInfo(CafeData));
      }
  }, [CafeLoading]);

  return (
    <>
      <section className="section-home container">
        <div className="inner">
          <SideBar />
          <div className="home-content">
            {location === "setting" ? (
              <>
                <Cafe />
              </>
            ) : location === "banner" ? (
              <>
                <Banner />
              </>
            ) : location === "add-category" ? (
              <>
                <RoomCategory />
              </>
            ) : location.includes("room-") ? (
              <>
                <Rooms />
              </>
            ) : (
              <>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia cumque obcaecati corrupti ullam illum esse distinctio
                porro repellat dolores molestiae magni, modi minus vitae numquam
                doloremque est eos magnam! Autem. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Accusamus cumque ducimus
                voluptatem dignissimos blanditiis ipsa quam libero tempore illo
                accusantium asperiores ipsum, aliquid culpa voluptatibus? Libero
                non necessitatibus quos delectus sapiente dolorem exercitationem
                rem sunt eum molestias! Ab ut, veritatis illo sunt hic molestias
                odio asperiores atque exercitationem accusantium quisquam
                explicabo esse accusamus vitae quis quibusdam ipsum, beatae
                maiores libero, quaerat minus expedita harum. Exercitationem ea
                inventore assumenda, animi saepe ad cum blanditiis ipsum
                dignissimos nulla dolores, ab sint! Recusandae quod sequi neque
                dignissimos illum architecto beatae. Nostrum assumenda quia
                recusandae veritatis accusamus molestiae. Odio nesciunt ab
                tempora quidem doloribus impedit distinctio ducimus animi
                veritatis nam laboriosam enim, necessitatibus quibusdam.
                Aperiam, velit voluptatem? Unde, recusandae quia sunt quos vel,
                est temporibus reiciendis nesciunt deserunt, sapiente incidunt
                odio placeat saepe fugiat optio architecto non qui quam
                doloribus. Totam, saepe odio est ab ratione similique harum
                ipsam error quis numquam culpa quam pariatur! Illum commodi
                mollitia exercitationem similique recusandae, repellendus rerum
                consectetur explicabo voluptate sed? Dolorem quos sit rerum
                molestias quisquam repellat quas tempora sint fugiat!
                Perspiciatis possimus velit dolorum iusto rem nihil ipsam
                debitis dolorem, earum tenetur, perferendis eum doloremque.
                Maiores fuga cupiditate tempore ex quas iste voluptatum
                assumenda molestias quam, consequuntur, voluptates quos ut
                incidunt quisquam quibusdam rem nemo ipsam. Dignissimos, alias
                delectus ut eaque numquam consectetur, veritatis sunt earum
                praesentium ratione blanditiis dolor eos fugit quasi iste neque
                quis harum voluptas, nobis quae? Alias, recusandae. Voluptate
                ullam voluptas accusantium quaerat error, hic enim velit.
                Dolorum cumque reprehenderit iusto natus in, ex vero laborum
                magnam nulla impedit asperiores! Ratione maiores aspernatur
                quisquam, ab illo quibusdam cum expedita consectetur laudantium
                numquam dignissimos nulla? Magnam eveniet architecto ad
                aspernatur numquam sint! Deleniti voluptas nam molestias
                laudantium hic dolor assumenda quam, praesentium eum pariatur
                commodi velit, incidunt ad doloremque maiores ipsa repellendus
                quo minus labore expedita nisi exercitationem nesciunt
                consectetur modi? Repellendus esse asperiores eum nulla ut,
                suscipit maxime porro tempora tempore eligendi quibusdam nobis
                hic dolorem, consequatur, deserunt voluptates excepturi autem
                ipsam velit? Laborum amet minus placeat libero aut similique
                totam accusantium neque ut praesentium temporibus, nesciunt
                alias vel aspernatur maiores fugiat, qui atque? Obcaecati
                tempora voluptatem error fugiat nulla quam enim, dignissimos
                repellendus blanditiis earum officiis harum repudiandae at animi
                doloremque minima quas nobis minus exercitationem hic, sunt
                culpa reiciendis? Impedit libero nemo inventore eaque
                consequatur? Reiciendis maxime sunt possimus saepe, mollitia
                nostrum necessitatibus magnam? Officiis cum tenetur quia iste
                eaque molestias, unde sunt. Qui, accusamus nisi aliquam quos
                optio nobis laboriosam sint. Earum magni quas culpa fugiat
                delectus itaque! Repellat voluptatum explicabo, sunt consequatur
                est ducimus unde eveniet vel fuga molestias culpa blanditiis
                libero, illo nesciunt asperiores, perspiciatis quod saepe
                recusandae error aliquid nulla minima quis? Et sed culpa qui
                omnis? Sint non odio unde repudiandae odit consequuntur cum
                saepe distinctio excepturi ex, velit, necessitatibus placeat
                iste natus fugiat voluptatum corporis enim incidunt? Aliquid
                distinctio aperiam fuga sit. Perferendis voluptates,
                perspiciatis ipsum, consequatur officiis magni non autem optio
                rerum illo ipsam expedita quia, neque id! At, ut tempora.
                Corrupti, impedit voluptatum. Consequatur aliquam vel quo
                inventore tempore suscipit officia praesentium, eveniet mollitia
                quas iste incidunt maiores tenetur sunt rem veniam temporibus,
                quis distinctio. Quos dolorem laboriosam exercitationem
                consequuntur minus, omnis labore, esse ut obcaecati repellendus
                eaque, nisi perspiciatis sed. Autem vitae dicta natus ad
                exercitationem quo soluta libero aspernatur nesciunt quae quasi
                iste, reprehenderit, magni velit molestias at aliquam eos eius
                facere fugit eligendi architecto voluptatum veritatis! Dolor,
                dolore nam odit at illum veniam. Ipsa aspernatur aliquid eos
                repellendus deleniti quos eveniet repellat praesentium
                reiciendis? Consectetur dignissimos laudantium sit, sunt
                voluptatem ipsam quaerat beatae magnam quibusdam culpa
                aspernatur quae dolorem expedita nihil dolorum, tempora labore
                ullam, sapiente reiciendis voluptatum reprehenderit possimus?
                Iure, ea dolores accusamus tempora mollitia ipsum doloremque et
                itaque voluptas atque aut possimus veniam modi eum, aliquam
                nesciunt deleniti quidem hic ullam. Maiores amet sit earum
                laboriosam provident voluptate nihil harum eum fugiat ea iusto
                quas culpa sapiente optio, ipsam, tempore consequatur aperiam
                aut voluptas placeat! Culpa quis aliquid maiores aperiam
                deleniti autem exercitationem cupiditate sequi quod. Veniam quod
                dolor aspernatur officiis quis, sit asperiores minima omnis.
                Ducimus nihil, enim repudiandae reprehenderit maxime illum quae
                necessitatibus dolorem quo at similique laborum expedita
                doloribus sit? Blanditiis ab iure ullam excepturi reiciendis
                consequatur commodi debitis repellat perferendis, quos nobis
                quod iusto tenetur fuga, inventore voluptas earum minus adipisci
                hic ipsum. Labore similique expedita porro molestiae eaque
                asperiores ut quasi, quas sint eius, laborum iste ab temporibus
                non! Non quibusdam voluptate laudantium maiores atque aut
                incidunt, repellendus, eveniet facere fuga fugit voluptas minus
                commodi odit! Dicta blanditiis animi iure iste sint tenetur,
                esse consequuntur asperiores illum labore pariatur quis deleniti
                aperiam quasi in error. Veniam ratione earum distinctio voluptas
                unde est iste excepturi, error maxime ad ipsa consequuntur
                quibusdam ut cum quidem, maiores corporis rem? Est quos aliquam
                saepe provident laudantium praesentium, sapiente nemo
                accusantium accusamus excepturi eligendi ipsam nulla soluta
                laborum ab, placeat quasi dicta minus iusto illum! Inventore est
                unde amet quos accusamus corporis, maxime ea ad sequi deleniti
                obcaecati illo doloribus eligendi omnis dignissimos voluptatibus
                fugiat rerum reprehenderit, quod, repellendus aperiam blanditiis
                maiores. Ea excepturi, dicta nobis delectus eveniet
                necessitatibus ab vitae rem modi expedita, consequuntur impedit
                nemo? Laudantium nostrum quis itaque a. Expedita optio libero
                voluptatum et eius cum, asperiores ad rerum iure pariatur
                placeat doloribus eveniet esse saepe voluptatem repudiandae
                tempore quos distinctio debitis! Iusto aliquam nostrum
                necessitatibus eveniet! Accusantium beatae fugit omnis veniam
                illo impedit pariatur laudantium sit, temporibus qui itaque vel
                soluta rerum deserunt officiis assumenda doloribus nobis. Dicta
                a adipisci ratione fuga? Aliquid perspiciatis aperiam et
                repellat voluptates in, optio ea qui mollitia ab illum sed,
                itaque atque eum ducimus illo exercitationem cumque tempora,
                temporibus sint voluptate nam accusantium eius. Expedita sit
                consequuntur explicabo cumque cum unde corrupti aspernatur
                mollitia, ad voluptatum quis pariatur ipsa natus provident
                blanditiis doloribus sequi aliquam eveniet similique quisquam et
                quasi modi. Cumque non rem accusamus doloremque, facilis
                molestias ab assumenda ipsum accusantium commodi maxime
                dignissimos odit recusandae omnis autem, vitae officia totam
                dolore tempore eligendi incidunt iusto! Unde pariatur maxime
                incidunt aliquam sunt quae minus, quidem ea ipsam sed voluptates
                repellendus aut ipsa totam, officia magni numquam cum quos
                dolores facilis. Amet, quas voluptates inventore saepe
                dignissimos rerum sapiente numquam nihil et, consectetur placeat
                officia similique, nisi esse nesciunt. Soluta voluptas placeat
                hic quibusdam fugit ratione architecto ipsa fuga eaque officiis
                laboriosam inventore reiciendis nesciunt corrupti voluptatem
                illum odit, reprehenderit facilis nemo exercitationem ab
                dignissimos! Facere asperiores incidunt provident sequi, vitae
                ab. Nobis hic dolorum consectetur fugiat rerum ipsam voluptate,
                quam perferendis aut nihil, a repellat vitae deserunt excepturi
                dicta? Architecto fugiat distinctio illum quos, laborum ad
                placeat excepturi consequuntur id, non perspiciatis magnam
                laboriosam animi, vitae veritatis enim iure aut quas
                reprehenderit officiis nemo. Distinctio dolorem nisi, fuga rerum
                unde ut, eum quasi omnis neque ex totam veritatis odio illo
                autem perferendis enim ipsum laudantium vel. Harum ullam nostrum
                nihil accusantium impedit placeat repellat deleniti atque totam
                sapiente inventore adipisci quaerat itaque, maiores corporis.
                Soluta ea adipisci numquam, sequi quam nesciunt iusto molestiae
                deleniti assumenda explicabo tempora rem consequatur pariatur
                perferendis libero ducimus itaque quo a vero nobis sunt voluptas
                quod magnam quasi? Impedit eius omnis quaerat tempore, earum
                libero porro incidunt repellendus, amet nulla mollitia obcaecati
                velit nemo maiores ab voluptas qui ea molestias enim totam nisi
                perspiciatis. Amet facere, consequuntur voluptas ipsa eos vel
                possimus laboriosam fugiat quisquam sint doloremque assumenda
                ullam magnam quas iure beatae temporibus officiis recusandae
                placeat, molestiae dolores ut. Repellat ducimus optio assumenda
                dolorem cumque deserunt tempora non sequi amet! Voluptates nam
                aspernatur asperiores nisi veniam incidunt labore fuga, deleniti
                vero velit placeat, commodi quo quaerat quasi culpa ea!
                Dignissimos suscipit eveniet necessitatibus, officia neque illum
                fugiat soluta ut quasi. Facilis atque odio, voluptatibus
                praesentium sunt est id quos ea earum tempore deserunt
                similique. Nesciunt reprehenderit blanditiis, debitis cumque
                eligendi distinctio minus culpa maiores optio, quod dolores eos
                harum, cupiditate consequuntur quo unde adipisci fugiat ipsa.
                Cupiditate facilis eveniet ab minima neque dolor modi iure
                accusamus incidunt, impedit veniam provident maiores quam, nisi
                possimus, asperiores illo architecto. Accusamus molestiae
                aliquam, neque deserunt nulla temporibus! Nulla quaerat odit
                velit officiis eius veritatis laudantium ratione minus harum
                architecto ab nihil doloribus fugit id, tempora accusamus sed
                blanditiis, similique expedita voluptatem natus dolorem animi
                facilis! Ab, consectetur obcaecati! Neque accusamus eos nisi
                nesciunt expedita dicta tenetur corrupti mollitia iste, sequi,
                ea porro. Eaque voluptatibus deleniti exercitationem sequi
                nesciunt, quo ducimus expedita pariatur laborum animi ex natus
                magnam provident? Deleniti velit numquam iste nesciunt
                reiciendis voluptatum iusto ipsum sapiente adipisci a molestiae
                commodi laboriosam sed labore impedit dolor eius fugiat ullam
                soluta, odit libero praesentium voluptates suscipit nam. Omnis
                optio neque ea nostrum, itaque, animi recusandae ipsam pariatur
                aliquam tempora aspernatur impedit, sequi ipsa nihil qui dolor
                iusto adipisci. Blanditiis quasi mollitia deserunt omnis at
                consectetur, perferendis pariatur laudantium nihil totam
                doloribus sequi amet reiciendis cupiditate? Temporibus minima
                officia, nesciunt architecto consequatur maiores unde
                necessitatibus ipsum labore error eum illum cupiditate? Expedita
                ipsam illo commodi sunt dicta corporis, id maiores! Obcaecati,
                id! Ab maiores laborum velit laboriosam nihil fuga atque
                consectetur, veniam esse enim alias. Qui vitae aspernatur ab
                recusandae dolorem at natus modi, a esse error, optio itaque
                voluptatibus? Iure natus iste eaque. Modi, ipsam quod quae ipsum
                sapiente atque, nisi doloremque ratione praesentium pariatur
                autem aspernatur rem vel. Doloremque facere ipsum accusantium
                laudantium perspiciatis reiciendis soluta minima aut sequi,
                voluptatum in rerum. Eum fugiat eveniet culpa repellendus? Alias
                est quisquam, quas hic voluptatibus quidem atque quasi deleniti
                illum voluptatum qui et quod reiciendis veritatis! Dignissimos
                nesciunt illum, enim, quaerat itaque nam aspernatur magni
                laudantium quia quas, sapiente ex. Temporibus deleniti ducimus
                dolorem quod voluptas nostrum similique obcaecati unde
                repellendus! Provident perferendis earum doloribus, excepturi
                dolore exercitationem illum veritatis perspiciatis voluptatum
                quos rem sint voluptatem ut quas saepe quidem nihil aspernatur
                est odio cum hic natus. Eligendi blanditiis similique odio
                quisquam eaque. Accusamus ratione earum dolorem saepe aspernatur
                modi deleniti corporis praesentium! Possimus odit ratione nulla
                nemo explicabo autem? Expedita non nam aut eum corrupti, nulla
                quos iste tenetur sunt, eos, at fugit deserunt consequuntur
                nostrum dolore aspernatur rem dolores officia maiores iure
                excepturi consequatur temporibus delectus soluta. Similique fuga
                ratione, consequatur, dignissimos obcaecati recusandae
                repudiandae ex quia id, reprehenderit explicabo sint delectus
                aliquid accusantium ipsum. Culpa aliquid, cupiditate nisi quae
                voluptatibus at atque ab quo enim suscipit blanditiis. Non
                ducimus consectetur harum maiores minima laborum, aut repellat
                reprehenderit corporis aliquam eos fugiat distinctio perferendis
                accusantium quae velit sit, atque ab recusandae sapiente! Optio
                soluta enim, similique omnis eveniet nesciunt impedit vel
                pariatur repellat quo qui voluptates laboriosam sint
                exercitationem provident. Eveniet beatae, nobis distinctio
                itaque quibusdam quam soluta ducimus sapiente? Natus, sequi
                fuga. Explicabo ipsum et aut ullam rerum, nostrum reprehenderit
                voluptate! Ipsum vero aliquid delectus aut deleniti fuga
                repellat, repellendus iure maiores, sapiente autem aperiam
                cumque ipsam repudiandae porro quaerat iusto. Aspernatur fuga
                doloremque labore ex, eligendi possimus aliquid explicabo et
                ipsam, cupiditate excepturi veritatis aut, quis odit ratione
                iusto non ad placeat corporis reprehenderit. Excepturi sed
                officia quaerat repellat similique deleniti totam impedit
                temporibus provident dolor ex, recusandae eveniet. Dicta
                corporis harum, id asperiores aperiam, recusandae quos repellat
                error fugit expedita distinctio rem mollitia, maxime cumque
                molestias aliquid iure deserunt illum doloribus magni? Tenetur,
                corporis ullam! Et quae itaque obcaecati voluptatum eveniet
                fugiat, tenetur ipsum expedita impedit voluptatem nostrum eos
                illo nemo nulla repudiandae fugit recusandae cum ab. Magnam fuga
                aliquid nemo assumenda delectus consequatur nobis fugiat porro
                eius repellendus, omnis unde sed, quidem rem dolor, iusto
                repellat odio excepturi officia temporibus quaerat. Tenetur
                magni, illum esse velit quae minima quaerat officia ipsum
                numquam eos saepe quia alias tempora molestiae sed ut amet eaque
                ex, animi quam quos optio accusamus! Eaque iure, id eius sed hic
                temporibus doloremque culpa minima repellat dicta in sit, soluta
                itaque nemo ut, illo quasi nostrum quod veritatis? Beatae
                adipisci molestiae optio placeat soluta impedit perspiciatis
                dignissimos, dolor, temporibus nesciunt quas ex quia expedita
                accusantium quaerat delectus iusto possimus. Nisi, ut! Quas odio
                adipisci odit ipsam dolorum distinctio explicabo inventore natus
                voluptate alias? Totam blanditiis laborum at excepturi omnis
                voluptas voluptate assumenda id neque officia temporibus
                veritatis culpa harum aliquam eligendi hic, labore quos officiis
                cupiditate cum ad ipsa eum eius minima? Rem molestias veritatis
                omnis, quae laborum unde quas modi. Et, dolore ea molestias
                dolor eveniet error enim nulla doloribus earum. Mollitia
                possimus non excepturi. Ea, optio ipsam ipsum at nihil
                cupiditate obcaecati laborum iusto aut odio amet, eius
                consequuntur dolorem, odit sit esse quas! Dignissimos aut
                laboriosam numquam architecto deleniti cum, ea doloribus, sed
                tempore necessitatibus perspiciatis totam officia reiciendis
                quos at reprehenderit quae voluptate distinctio ipsam qui, ipsum
                excepturi odio repudiandae itaque? Ut odit tempora nesciunt
                ipsum quisquam dolorem distinctio debitis deserunt consequatur
                similique voluptas, ratione atque beatae necessitatibus a
                commodi optio asperiores esse recusandae delectus qui mollitia.
                Corrupti blanditiis commodi ea exercitationem minima accusantium
                at itaque, nihil tempora tenetur laudantium soluta consequatur
                praesentium. Laborum maiores nihil possimus. Ab, saepe eos.
                Natus debitis eius quasi qui dolorum, itaque aliquam doloremque
                impedit deserunt pariatur ut veritatis! Nisi similique ullam
                minus magni eaque incidunt. Placeat vitae culpa, facilis
                ducimus, delectus velit esse ex eos modi suscipit at? Incidunt,
                aspernatur. Doloremque sequi enim temporibus aut voluptates
                numquam dolores fugit. Beatae odio corporis itaque! Aperiam
                voluptate nam facilis necessitatibus laborum sequi esse
                blanditiis, illo aspernatur, veniam illum officiis
                exercitationem voluptatibus aut ipsum? Mollitia, animi. Ut illum
                odio obcaecati incidunt optio. Nesciunt possimus at eveniet
                dolore quam ducimus veniam quos tenetur error consequatur rerum
                aliquid sed doloribus, soluta ex voluptas suscipit consequuntur
                fugiat nisi perferendis assumenda ad. Eos illum tempore aperiam?
                Excepturi corporis porro illo, molestiae accusantium omnis.
                Nihil laborum ea tempore porro! Incidunt possimus obcaecati,
                atque, architecto fuga eaque ullam perspiciatis ex, maiores
                ducimus quae iusto reiciendis impedit doloribus repellendus ad!
                Iure ea consectetur voluptas quisquam delectus neque vitae
                laboriosam deleniti harum aspernatur doloribus fuga facere, est
                autem at maxime, enim inventore voluptatum? Sit eaque sapiente
                quaerat dolorem inventore fuga, libero ab eveniet placeat quasi
                repellendus soluta officia, corporis iste architecto autem dolor
                excepturi velit. Rerum vero veritatis fugiat numquam? Inventore
                nihil odio vel unde. Amet rerum voluptatibus, dolores quisquam
                sunt maiores nihil fugit id molestiae minima, sed quod corrupti
                vel deserunt error laudantium repudiandae mollitia sint pariatur
                dicta asperiores nulla voluptas. Natus, sapiente non animi quos
                blanditiis velit doloremque, labore rerum, explicabo amet
                laborum modi doloribus aspernatur atque aliquid unde veritatis
                quae molestias ratione deserunt praesentium totam enim facilis
                omnis. Nulla sit alias, fugit laborum debitis quasi
                exercitationem molestias itaque nam eius cupiditate delectus
                reiciendis, quos assumenda. Ipsam culpa architecto voluptatibus,
                illum magni suscipit delectus quo accusamus possimus, at tenetur
                eius ad cumque quia perferendis. Quasi odit facere earum,
                dolorum voluptatibus consequuntur quia magni accusamus
                repudiandae inventore, non quas velit soluta numquam voluptates
                corporis fugiat, et ullam omnis accusantium? Necessitatibus
                mollitia dolorum, eius, dolore labore reiciendis consequatur quo
                neque nesciunt, soluta laborum laudantium voluptates
                reprehenderit? Aut fugiat corporis dolorum eum earum dicta
                cupiditate repellat fuga rem beatae quisquam unde explicabo,
                culpa perferendis quia repudiandae! Tempora voluptas dolor,
                molestiae sit libero vitae minima sapiente quidem, ratione ea
                quod id sequi cum voluptates atque consectetur assumenda amet
                magnam. Voluptates pariatur qui ea hic autem blanditiis, non
                expedita placeat libero illum veniam sit tempore eius
                necessitatibus delectus tempora eaque at officia veritatis
                nostrum accusamus explicabo sint. Pariatur maxime earum ipsum
                optio! Blanditiis maiores est, nisi fugiat assumenda soluta
                excepturi? Blanditiis harum illum repellat saepe nemo. Id
                repellendus voluptates error assumenda, placeat tempora quasi
                dolor quam maiores fugiat rem. Ad totam libero velit! Alias
                tempora deleniti ducimus omnis dolores, libero harum vero
                praesentium quam repellat dicta molestias quas accusantium iste
                eligendi. Ipsa perspiciatis amet reprehenderit veniam similique,
                veritatis voluptate, necessitatibus unde possimus tempore earum
                repellendus rerum cumque magnam expedita voluptatum nam ipsam
                totam consequatur inventore hic sapiente at! Dolores tenetur
                consectetur ducimus adipisci nihil aperiam modi quos ad dolorem.
                Sed deleniti, molestias laudantium pariatur cumque quaerat.
                Praesentium blanditiis harum exercitationem laudantium iste
                tempore laborum id ducimus eligendi ullam quas ab non fuga, odio
                asperiores, sed commodi tenetur animi iure. Dicta quasi, fugiat
                quidem maiores odit dignissimos animi at saepe autem. Magni
                explicabo nisi quis! Corporis doloribus consequuntur
                repudiandae. Rerum, maxime? Modi neque saepe vero dolorem ullam
                error porro reiciendis architecto doloremque? Non, nihil
                corporis. Deserunt enim accusamus necessitatibus, atque, facere
                vitae non ipsam, maxime dolore repellendus repellat eligendi
                fugiat harum voluptatem amet eos accusantium numquam hic saepe
                porro? Esse non modi explicabo et deleniti ducimus cupiditate,
                temporibus culpa hic, fuga iusto, error autem aut alias
                consectetur? Nam iusto quisquam reiciendis itaque atque odit
                tempore deleniti corrupti natus maiores pariatur tenetur harum
                cupiditate eveniet culpa numquam unde a, sed, ipsum dolore ipsam
                quasi repellendus? Fugiat sint aliquam harum natus quidem, ipsam
                exercitationem neque, dignissimos doloremque deserunt fugit at
                ratione quod? Consectetur sequi sit qui deserunt modi optio
                fugit. At dolorem possimus modi asperiores nulla error nostrum
                exercitationem! Assumenda sunt eveniet earum voluptatum libero
                vitae ab ipsam soluta nostrum in qui possimus corporis sint
                expedita, ipsa nobis voluptatibus obcaecati doloribus
                consequuntur praesentium dolor? Libero obcaecati doloribus
                laudantium. Qui excepturi odio veniam magni corporis eius vel
                quaerat porro optio, consequuntur ex eos debitis nobis
                repudiandae ut quia at minus facere nulla nesciunt sunt.
                Repellat autem incidunt, rem, nostrum molestiae consequatur ea
                beatae reiciendis velit dolore debitis. Ad cum earum
                consequuntur rerum provident? Quas vel necessitatibus corporis,
                illum nobis id quaerat omnis error animi saepe. Enim ex odio
                minima. Commodi repellendus quia et vitae? Iusto eum magnam
                voluptate numquam laboriosam unde officiis quidem quibusdam.
                Autem, nihil cum, asperiores necessitatibus perspiciatis fugit
                quasi officia nemo minus neque itaque ipsam blanditiis
                distinctio veritatis quod natus. Consequatur tempore nisi
                reprehenderit, maxime dolorem veniam quod totam fuga consectetur
                delectus. Aliquid officiis accusantium repellat tempore dolorem
                cum distinctio perspiciatis suscipit beatae minus eos aliquam,
                officia, rem sequi! Aut aperiam obcaecati provident maiores
                consequuntur commodi architecto perspiciatis totam, quibusdam
                cum. Minus earum vero modi impedit aliquam quibusdam,
                laboriosam, totam consequatur adipisci nostrum voluptates sunt?
                Nemo velit beatae sint nulla, nesciunt quas molestias
                exercitationem quis at, repudiandae dolore dolorem dolores
                excepturi officiis a itaque, obcaecati voluptatem error
                reprehenderit quam. Repellendus, nam vel aliquid velit ipsa
                beatae sequi ab ea cupiditate culpa cum ut error autem, tempora
                laudantium. Incidunt, quam esse ratione commodi cupiditate
                eveniet similique reprehenderit. Ea id ipsum modi pariatur,
                blanditiis repellat. Ad maiores dolor, saepe excepturi unde
                odio! Aliquid, quaerat nam. Libero modi dolore provident nobis
                aut sequi error odit deleniti, aliquid distinctio delectus neque
                molestias tempora facilis unde illum quo expedita vero
                aspernatur. Tenetur quisquam sint aliquid corrupti mollitia,
                laboriosam adipisci? Dicta vero unde a nihil corrupti maiores
                consequatur. Impedit dolore fuga exercitationem vero ipsam
                praesentium, sint voluptates illo, sapiente a, unde illum fugit
                quis architecto dicta corporis perspiciatis minima quam repellat
                in? A totam, quae dolores molestiae asperiores nesciunt
                inventore possimus voluptates, id ipsa cumque consequatur
                explicabo dolor veniam eos. Quas quibusdam corporis repellat
                consequatur a beatae, ducimus porro adipisci provident ut, atque
                obcaecati iusto nisi ipsa dolor ad quam accusamus, doloremque
                aliquid voluptatibus? Rem delectus dignissimos autem
                necessitatibus nam architecto consequuntur qui nisi minus
                cupiditate, quos non ad dolor, magnam soluta inventore
                aspernatur saepe perferendis blanditiis dolorum nostrum
                provident velit. Rem dignissimos sit dolor qui, tempore impedit
                asperiores facere nulla optio commodi itaque accusantium dicta,
                error blanditiis quos maiores, numquam repellat nesciunt dolores
                incidunt quod quaerat enim beatae atque! Incidunt labore quo
                quaerat. Porro, aut! Laborum deserunt officia id neque similique
                in eaque expedita cum eum deleniti dolores suscipit, veritatis
                ratione modi fuga dolore corporis provident ea a recusandae
                omnis aut. Similique nisi perspiciatis a doloremque eos? Culpa
                nemo temporibus ratione dolorem veritatis quam ipsa similique
                ullam, inventore laudantium adipisci omnis sunt deserunt, ex
                autem sed vero accusantium alias voluptates ipsum odio! Delectus
                labore et neque. Odio, ex doloremque expedita mollitia sed
                sapiente ea, distinctio cupiditate cumque sunt aliquid animi,
                consectetur magnam quam! Incidunt quia dolorum delectus quos,
                accusamus beatae, sit, nam praesentium officia et sint facere
                cumque unde error temporibus placeat nulla! Eius ipsam dolore
                doloribus ex corporis, nemo asperiores natus, est esse hic ad.
                Accusantium tempora ex laudantium explicabo atque, eum est
                provident molestiae sunt esse a autem magni corrupti veritatis
                minus! Laboriosam eos quaerat doloribus explicabo obcaecati qui
                ut reprehenderit dolorem totam consectetur quibusdam, assumenda
                ducimus culpa quae, laborum deleniti. Nostrum numquam fuga eum
                non reprehenderit ea architecto, adipisci eaque praesentium
                deleniti amet odit modi explicabo repudiandae iusto dolorem in
                pariatur provident voluptas ex quos vero vitae nihil. Dolore
                officiis molestias, in ex quia dignissimos magnam alias, illum
                nemo sunt ad necessitatibus laborum blanditiis cumque officia
                hic voluptates modi nobis! Voluptatum labore doloremque ad
                consequatur aspernatur. Esse eos perspiciatis nesciunt aliquam.
                Nostrum, quae, aliquid similique dolore pariatur excepturi est,
                obcaecati ipsam ullam ducimus laborum quam officia unde facilis
                illum cupiditate ratione iusto asperiores ab neque nemo quia?
                Natus illo temporibus eius hic officia libero minus sit
                repellendus qui, reprehenderit, reiciendis, necessitatibus
                dolorum! Deleniti tempora hic soluta culpa expedita aliquam
                alias recusandae laborum quidem. Deleniti temporibus similique
                earum animi nihil, harum asperiores dolorem qui omnis
                praesentium dolores repellendus voluptatem quo voluptatibus
                architecto possimus error placeat? Quidem et id illum
                voluptatibus, possimus minima. Tenetur, modi, iure repellendus
                sit, illo fuga vitae asperiores sapiente voluptatum neque
                aliquid inventore eos. Cupiditate praesentium delectus alias
                molestiae, natus iure id porro aperiam corrupti nisi recusandae
                est atque a beatae commodi maxime distinctio exercitationem.
                Amet tempora ad porro accusantium libero laboriosam voluptas
                animi iure similique neque voluptate quae, excepturi ipsa at non
                ut corrupti recusandae! Aliquam sed, eaque quisquam quam ad
                sequi doloribus quia aperiam id quod corporis, nulla facilis
                debitis! Odit illo nihil impedit? Ipsa, similique quae
                consequatur suscipit asperiores, aliquam blanditiis voluptate
                nulla architecto ratione ex tempore? Incidunt fugit laudantium
                molestiae doloremque expedita iste nisi, laborum sapiente
                dolorem in quam? Vero molestias eos delectus cupiditate quis
                minima ullam, quos facilis, dicta impedit deserunt iusto.
                Beatae, sunt eveniet labore delectus doloremque aperiam mollitia
                minima esse dolor aliquam quibusdam doloribus sit rem rerum
                facilis laboriosam maxime cum similique corrupti. Itaque ipsa
                earum at natus quam cupiditate architecto repellat laborum?
                Repellendus ducimus minus quibusdam reiciendis adipisci
                necessitatibus facilis, at numquam quidem quae illo ad sapiente
                laborum voluptas sequi blanditiis similique quia. Voluptate,
                repellat architecto nobis illo praesentium voluptatibus neque
                cupiditate error optio veritatis libero rerum magni vero
                sapiente, enim quod adipisci doloribus! Libero magni odit nam
                possimus soluta. Iure nisi aliquid dolor laboriosam ipsa magni
                odit at, expedita voluptatibus provident! Aliquid quod, dolores
                sunt officiis omnis ut enim totam exercitationem. Quas accusamus
                ut, culpa non distinctio, nihil aliquid aperiam modi quae
                sapiente omnis. Sapiente laborum ex vel id saepe hic ad tenetur,
                eius quod enim harum aliquam odio ipsa ipsam esse aut unde omnis
                dicta cupiditate, accusantium molestiae voluptas? Alias facere
                fugiat expedita sapiente deserunt, labore nemo ratione
                repudiandae, odit doloremque cupiditate. Excepturi provident
                omnis a praesentium? Illum vero saepe officiis aperiam omnis
                temporibus quidem laudantium at laborum iure recusandae amet
                voluptates autem, sed consectetur totam dolorem, quo dignissimos
                tenetur officia accusamus deserunt? Voluptas quam porro
                recusandae magni labore vero maxime aspernatur, ratione delectus
                sed illum, nam impedit pariatur in consectetur suscipit est
                neque aut sit modi unde laborum fugiat? Dolore enim quas sit ad
                aperiam, accusantium quisquam quos aut earum aspernatur tenetur
                veritatis quibusdam molestiae repellendus numquam omnis
                deserunt, quia odit veniam cupiditate vitae porro repellat
                fugit. Vitae, amet dolorum officiis consequatur facere voluptate
                saepe qui excepturi obcaecati consequuntur illo maiores quasi
                alias repellat consectetur nisi esse non mollitia ab. Hic cum,
                incidunt ad doloremque esse minus expedita facere pariatur alias
                magnam necessitatibus tempora explicabo, aut maxime nesciunt eum
                optio assumenda nisi earum eveniet molestias et! Beatae qui
                voluptatum eligendi impedit. Vero qui autem reiciendis suscipit,
                amet facilis ut porro tempora aut possimus cupiditate mollitia
                excepturi earum saepe temporibus atque doloremque id dignissimos
                quam animi ducimus minima assumenda ea. Quo, iusto quaerat
                assumenda expedita a, eos debitis, itaque tempora sint provident
                qui. Fugit numquam cumque iusto, minima facere officia quia
                iste, quasi unde dolor eius rem laudantium porro tempore
                repudiandae molestiae! Asperiores, rerum? Dolor voluptates
                asperiores sapiente quod cumque qui, ad soluta ex necessitatibus
                numquam, dicta dolore aliquid assumenda minus consequatur animi
                possimus natus quam eveniet excepturi totam! Eum repudiandae ut
                deserunt itaque eligendi ipsum expedita quisquam provident
                excepturi mollitia saepe praesentium voluptatibus ipsa molestiae
                nobis, quia officia aut veritatis incidunt quasi repellat
                minima, impedit deleniti! Autem ducimus odit libero magni,
                dolore quis quo soluta vitae veritatis voluptate ipsa ipsum sit
                modi nemo in dolores est doloribus optio, unde esse dignissimos
                animi consequuntur? Recusandae sunt maiores autem provident quas
                facilis quae molestias! Nostrum assumenda, excepturi dolore,
                optio minima voluptas aut harum, ab blanditiis architecto
                distinctio. Modi possimus doloribus aliquid hic nisi delectus
                quibusdam ratione quisquam magnam, numquam tenetur eos libero
                cupiditate ea odit quia vel et quo officia eveniet ex
                reprehenderit dolor quasi nemo! Quaerat aperiam accusantium
                optio, rem id officiis blanditiis odio quasi dolor, autem
                pariatur corrupti provident perferendis omnis nemo veritatis
                molestiae eaque sed aliquam. Sit eum inventore alias delectus
                autem molestias soluta consequuntur asperiores id? Aliquid autem
                distinctio excepturi alias dolorem itaque nobis deserunt quo
                cupiditate iste commodi enim laboriosam minus, odio modi, sequi
                voluptatum nam, et debitis amet voluptatem laborum quisquam
                repudiandae sed! Sapiente consequatur ad cum accusamus facere
                molestias, et sit dolorum pariatur magni quos cupiditate in
                perferendis quas voluptas possimus velit repudiandae, similique
                libero ullam numquam, distinctio illo. Nisi sunt unde tempora
                recusandae minima placeat consectetur dolores molestiae,
                aspernatur quibusdam minus a, tenetur corporis delectus enim
                eius ipsam labore numquam aliquid porro reiciendis suscipit
                ullam sed. Iusto ducimus totam nihil quia vero aliquam, pariatur
                ea vel, nesciunt assumenda architecto illo consequuntur
                aspernatur laboriosam aperiam doloribus minima nam quas velit
                libero accusamus? Esse maxime beatae quisquam nam dolorum vel
                eum eius cum officia earum vero aspernatur molestias eos porro,
                velit ipsam, consequatur maiores blanditiis nostrum hic?
                Consequuntur repudiandae quos quam doloremque tempore dolorem
                ipsum magni neque et ducimus, velit iure similique? Dolores
                itaque non inventore minus porro aspernatur sequi mollitia
                aliquid, vero, sunt ipsum nulla deserunt nihil unde repudiandae
                voluptates ratione est esse dolorum? Aliquid velit,
                necessitatibus quasi inventore at asperiores aperiam omnis
                quidem iste eum nesciunt nisi cumque. Inventore, totam ducimus
                praesentium assumenda, esse ipsum magnam obcaecati magni
                cupiditate ipsa, molestiae quisquam cum voluptates. Minus nemo
                quae fuga porro beatae aspernatur dolores ea ad unde nostrum,
                molestiae assumenda quam eum iure velit placeat a iste.
                Laudantium magni unde nobis qui consectetur aut id corporis
                recusandae harum eligendi, earum voluptatum esse veritatis nihil
                quos minima amet. Voluptatem ex quaerat illum ratione, quibusdam
                fuga nisi delectus, pariatur iure soluta cupiditate nihil
                recusandae veritatis necessitatibus impedit sed sunt repellat
                laborum facilis itaque ad praesentium. Ex ut praesentium
                consequatur perferendis quasi architecto nihil. Eligendi,
                dolorum voluptate. Perferendis repellat quae voluptate voluptas
                laborum illo, vitae recusandae ab quidem, illum itaque magnam
                unde modi atque. Vel, vero corporis aperiam eius alias magni
                ipsa nemo fuga aut, soluta modi minus nam nihil saepe, dolores
                exercitationem impedit officiis sed accusamus animi a excepturi
                reprehenderit. Provident perferendis voluptatem incidunt officia
                minima. Voluptates veritatis amet, a maxime quo quasi provident
                laudantium fuga perspiciatis ipsam perferendis vero sunt modi
                quisquam nobis. Eveniet reiciendis eligendi dolor aperiam
                voluptates alias laborum quasi dolorum error adipisci deleniti
                harum nulla, obcaecati sapiente explicabo consequuntur minus
                consequatur, at iusto aliquam maiores quia magnam cupiditate?
                Modi temporibus culpa ducimus libero odio accusantium voluptas
                doloremque esse quibusdam? Similique, aliquid rem? Saepe quaerat
                eius, animi, omnis distinctio itaque nihil recusandae
                consequuntur aliquam et cupiditate atque nemo quidem. Soluta
                aliquam voluptate blanditiis odio sapiente nisi. Autem rem
                iusto, impedit sed non doloremque magnam soluta ipsam commodi
                aperiam cupiditate repudiandae dolor natus, modi beatae
                perferendis asperiores provident dignissimos, quae ab nulla
                architecto exercitationem saepe. Labore natus non aspernatur ea
                quam magni facere omnis beatae explicabo debitis ducimus, velit
                nihil libero, iusto quas iste. Consectetur non mollitia
                officiis. Sint excepturi expedita nobis nulla impedit culpa
                blanditiis aperiam accusantium laudantium inventore harum
                molestiae, quos dolorum reprehenderit autem voluptas ea tenetur
                laborum exercitationem ab praesentium accusamus itaque! Velit
                deserunt totam possimus. Officia, voluptate corrupti velit
                pariatur a ipsa aperiam, repellat saepe fugiat recusandae ipsum
                earum laborum illum est voluptatem eius. Architecto sed illum
                natus provident quasi necessitatibus labore rem dolore nulla
                quas, dolorem, consectetur ipsam, iusto repellendus sit impedit
                laborum dolor esse hic ratione fugiat! Officia eveniet natus ut
                labore. Ex veritatis cupiditate sunt corporis nisi, deserunt
                animi voluptates neque ut? Tempora quas veritatis explicabo
                ipsam repellat ex, aliquam quibusdam quaerat asperiores nihil
                saepe, eveniet distinctio omnis repudiandae. Quos veritatis
                minus numquam vero! Aliquid facere error fugiat saepe vero
                accusantium corrupti nostrum cupiditate quod eveniet,
                consequuntur sapiente laborum suscipit consectetur dolores
                doloribus deserunt numquam adipisci sit corporis ullam aut. Sit
                corporis error hic tempora cum aut eos autem dolorum nulla
                cumque saepe excepturi sapiente officiis eum dolores consectetur
                officia, minus molestiae vero. Repellendus eligendi ipsam harum
                sunt fugiat et eius totam adipisci praesentium nostrum!
                Consectetur culpa hic officia obcaecati non quo temporibus eos
                ullam odit laudantium at reiciendis dolorem aut cum, placeat
                harum iusto! Fugiat maiores neque eligendi quisquam magnam
                suscipit molestiae laborum perferendis quae eius, aliquam
                architecto aspernatur voluptate! Dignissimos ex impedit numquam
                expedita corporis illum nihil, neque, eligendi earum cupiditate
                quis consectetur assumenda eius, harum totam. Doloribus, quaerat
                distinctio expedita animi minima illum rerum minus saepe quis
                iste atque perferendis dignissimos voluptatibus unde placeat
                voluptas ipsam necessitatibus. Deserunt in esse fuga non maiores
                alias veritatis et aliquid eligendi beatae sunt iste, pariatur
                aspernatur rerum excepturi assumenda? Natus possimus eum aperiam
                non. Nam blanditiis sapiente recusandae eum cupiditate optio,
                minus asperiores, facilis culpa enim fugiat quo, doloribus error
                nesciunt ab officiis? Debitis in quisquam nesciunt autem
                corporis eum voluptas, qui deserunt omnis eaque ducimus placeat
                est consectetur delectus, ex temporibus impedit corrupti. Nulla
                ab quo eum eveniet? Aperiam quia est voluptatem distinctio.
                Placeat saepe dolor repellendus itaque ratione soluta illum
                neque, ducimus, sint culpa dignissimos laborum non ex laboriosam
                iure est optio perspiciatis corporis error. Aspernatur
                temporibus deserunt natus odit beatae similique nobis, dolorem
                hic, culpa officiis saepe nesciunt sapiente deleniti tenetur
                voluptate provident numquam. Incidunt ab vero recusandae libero
                facere, fuga ratione adipisci eveniet natus dolorum eius
                voluptatum dolorem aut illo quae minima impedit obcaecati
                suscipit. Dolores ad numquam minus vel saepe? Animi, dolorum
                facilis!
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
