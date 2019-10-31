// @flow

import PropTypes from "prop-types";
import {attr } from "redux-orm";
import forrest_gump from '../../Pictures/forrest_gump.jpg';
import sluha_dvou_panu from '../../Pictures/sluha_dvou_panu.jpg';

import CRUDModel from "../ORM/CRUDModel";

export default class Event extends CRUDModel {}

Event.modelName = "Event";

Event.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    type: attr(),
    genre: attr(),
    picture: attr(),
    age_limit: attr(),
    date: attr(),
    description: attr(),
    ytb_url: attr(),
    director: attr(),
    time: attr(),
    duration: attr(),
    room: attr(),
};

Event.fixtures = [
    {
        id: 1,
        name: "Forrest Gump",
        type: "Film",
        country: "USA",
        year: 1994,
        genre: "Drama/Komedie/Romantický",
        picture: forrest_gump,
        age_limit: 15,
        director: "Robert Zemeckis",
        ytb_url: "https://www.youtube.com/watch?v=uPIEn0M8su0",
        description: "Zemeckisův film je brilantním shrnutím dosavadních režisérových poznatků o možnostech \"comicsového\" vyprávění. Formálně i obsahově nejméně konvenční z jeho snímků přesvědčuje komediálními gagy i naléhavě patetickým tónem. Jeho hrdinou je prosťáček Forrest Gump, typický obyčejný muž, který od dětství dělal, co se mu řeklo. Do života si tak odnesl několik ponaučení své pečlivé maminky a osvědčené pravidlo, jež se mu hodí mnohokrát v nejrůznějších situacích: Když se dostaneš do problémů, utíkej. Forrest proutíká školou, jako hráč amerického fotbalu i univerzitou, potom peklem vietnamské války a zoufalstvím nad matčinou smrtí. Vždycky je totiž někdo nebo něco, co po něm skutečně či obrazně \"hází kameny\". Nakonec však Forrest poznává, že jsou i jiná řešení situací než útěk. Svůj život spojuje s kamarádkou ze školy Jenny, která pro něj zůstane provždycky jedinou láskou, s přítelem z vojny, černochem Bubbou, který dá směr jeho úvahám o lovu krevet a s poručíkem Taylorem, jemuž ve Vietnamu zachrání život. Forrestova životní pouť od 50. do 80. let je koncipovaná jako totálně \"bezelstné\" vyprávění hrdiny, neschopného obecnějšího hodnocení situace. Forrest jako sportovec i jako válečný hrdina se setkává se slavnými lidmi, které nakonec vždycky někdo zastřelí (J. F. Kennedy, J. Lennon). Také jeho bližní umírají, ale on sám zůstává. Empiricky se dopracovává od impulsivního útěku před životem k úvahám o lidském osudu a o Bohu. Soukromý hrdinův osud zároveň postihuje třicet let poválečných amerických dějin.",
        version: "České",
        date: new Date(),
        time: "20:00",
        duration: 168,
        room: "Sál 1",
    },
    {
        id: 2,
        name: "Sluha dvou pánů",
        type: "Činohra",
        country: "Itálie",
        year: 1745,
        genre: "Komedie",
        picture: sluha_dvou_panu,
        age_limit: 12,
        director: "Carlo Goldoni",
        ytb_url: "https://www.youtube.com/watch?v=TJX5xWnTHj8",
        description: "Legendární inscenaci hry Carla Goldoniho SLUHA DVOU PÁNŮ nastudoval se souborem Činohry v roce 1994 tehdejší umělecký šéf Ivan Rajmont. V inscenaci se během 20 sezon vystřídala desítka herců. Trufaldina však stále hraje Miroslav Donutil, který rozvíjí tradici hereckých improvizací k velké radosti mnoha diváků. Inscenace v listopadu 2014 oslavila neuvěřitelnou 550. reprízu a stále si nachází své početné publikum, které zcela zaplňuje hlediště Národního divadla. Sluha dvou pánů má tradiční postavy a situace. Odehrává se v úzkém rodinném rámci, kde jsou hlavní událostí zásnuby, které komplikuje sluha Truffaldino, mazaný a přihlouplý zároveň. Rozehrává komedii záměn a nedorozumění, poháněn svým věčným hladem, skrze nečekané peripetie až ke šťastnému konci. Obklopují ho tradiční postavy – ustaraný tatík Pantalone, přemoudřelý doktor a jejich zamilované děti, dobrodružný pár milenců, hostinský Brighella a služka Smeraldina.",
        version: "České",
        date: new Date(),
        time: "19:00",
        duration: 95,
        room: "Sál 2",
    },
];

Event.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    time: PropTypes.string,
    room: PropTypes.string,
};