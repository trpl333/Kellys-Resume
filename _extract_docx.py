import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def docx_text(path: Path) -> str:
    with zipfile.ZipFile(path) as z:
        xml = z.read("word/document.xml")
    root = ET.fromstring(xml)
    paras: list[str] = []
    for p in root.iter(f"{W}p"):
        texts: list[str] = []
        for t in p.iter(f"{W}t"):
            if t.text:
                texts.append(t.text)
            if t.tail:
                texts.append(t.tail)
        line = "".join(texts).strip()
        if line:
            paras.append(line)
    return "\n".join(paras)


def main() -> None:
    base = Path(__file__).resolve().parent
    out_dir = base / "_extracted"
    out_dir.mkdir(exist_ok=True)
    for name in sorted(base.glob("*.docx")):
        print("=" * 80)
        print(name.name)
        print("=" * 80)
        try:
            text = docx_text(name)
            (out_dir / (name.stem + ".txt")).write_text(text, encoding="utf-8")
            print(text)
        except Exception as e:
            print("ERROR", e)
        print()


if __name__ == "__main__":
    main()
