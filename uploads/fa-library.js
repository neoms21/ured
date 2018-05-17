import fontawesome from "@fortawesome/fontawesome";

import faQuestionCircle from "@fortawesome/fontawesome-free-solid/faQuestionCircle";
import faChevronDown from "@fortawesome/fontawesome-free-solid/faChevronDown";
import faChevronUp from "@fortawesome/fontawesome-free-solid/faChevronUp";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import faExclamation from "@fortawesome/fontawesome-free-solid/faExclamation";
import faInfo from "@fortawesome/fontawesome-free-solid/faInfo";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faCircle from "@fortawesome/fontawesome-free-solid/faCircle";
import faDownload from "@fortawesome/fontawesome-free-solid/faDownload";
import faExternalLinkAlt from "@fortawesome/fontawesome-free-solid/faExternalLinkAlt";
import faFilePdf from "@fortawesome/fontawesome-free-regular/faFilePdf";

export default function() {
  fontawesome.library.add(
    faQuestionCircle,
    faChevronDown,
    faTimes,
    faChevronUp,
    faExclamation,
    faExternalLinkAlt,
    faDownload,
    faCircle,
    faCheck,
    faInfo,
    faFilePdf
  );

  console.log(fontawesome.library)
}
