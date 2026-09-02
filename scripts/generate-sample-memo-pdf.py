from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from svglib.svglib import svg2rlg


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "ตัวอย่าง-บันทึกข้อความ-เบิกจ่ายเวชภัณฑ์.pdf"
FONT_DIR = ROOT / "public" / "fonts"


def register_fonts():
    pdfmetrics.registerFont(TTFont("THSarabunNew", str(FONT_DIR / "THSarabunNew-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("THSarabunNew-Bold", str(FONT_DIR / "THSarabunNew-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("THSarabunNew-Italic", str(FONT_DIR / "THSarabunNew-Italic.ttf")))
    pdfmetrics.registerFont(TTFont("THSarabunNew-BoldItalic", str(FONT_DIR / "THSarabunNew-BoldItalic.ttf")))
    pdfmetrics.registerFontFamily(
        "THSarabunNew",
        normal="THSarabunNew",
        bold="THSarabunNew-Bold",
        italic="THSarabunNew-Italic",
        boldItalic="THSarabunNew-BoldItalic",
    )


def garuda_drawing(width=15 * mm):
    drawing = svg2rlg(str(ROOT / "public" / "garuda.svg"))
    scale = width / drawing.width
    drawing.scale(scale, scale)
    drawing.width *= scale
    drawing.height *= scale
    return drawing


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("THSarabunNew", 12)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.drawString(25 * mm, 11 * mm, "เอกสารตัวอย่างจากระบบ Stock Logistics Sisaket")
    canvas.drawRightString(A4[0] - 20 * mm, 11 * mm, f"หน้า {doc.page}")
    canvas.restoreState()


def build_pdf():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    body = ParagraphStyle(
        "Body",
        fontName="THSarabunNew",
        fontSize=16,
        leading=19,
        spaceAfter=3 * mm,
        alignment=TA_LEFT,
    )
    body_justify = ParagraphStyle("BodyJustify", parent=body, alignment=TA_LEFT, firstLineIndent=18 * mm)
    body_no_indent = ParagraphStyle("BodyNoIndent", parent=body, alignment=TA_LEFT)
    label = ParagraphStyle("Label", parent=body, fontName="THSarabunNew-Bold", spaceAfter=0)
    memo_title = ParagraphStyle(
        "MemoTitle",
        fontName="THSarabunNew-Bold",
        fontSize=29,
        leading=31,
        alignment=TA_CENTER,
        spaceAfter=1 * mm,
    )
    table_text = ParagraphStyle("TableText", parent=body, fontSize=16, leading=18, spaceAfter=0)
    table_center = ParagraphStyle("TableCenter", parent=table_text, alignment=TA_CENTER)
    table_right = ParagraphStyle("TableRight", parent=table_text, alignment=TA_RIGHT)
    signature = ParagraphStyle("Signature", parent=body, alignment=TA_CENTER, spaceAfter=0)

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=25 * mm,
        rightMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
        title="บันทึกข้อความเบิกจ่ายเวชภัณฑ์",
        author="สำนักงานสาธารณสุขจังหวัดศรีสะเกษ",
        subject="เอกสารตัวอย่างจากระบบ Stock Logistics Sisaket",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates(PageTemplate(id="memo", frames=[frame], onPage=page_footer))

    header = Table(
        [[garuda_drawing(), Paragraph("บันทึกข้อความ", memo_title), ""]],
        colWidths=[23 * mm, doc.width - 46 * mm, 23 * mm],
        rowHeights=[20 * mm],
    )
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (0, 0), "LEFT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    meta_rows = [
        [Paragraph("<b>ส่วนราชการ</b>", label), Paragraph("สำนักงานสาธารณสุขจังหวัดศรีสะเกษ กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข", body)],
        [Paragraph("<b>ที่</b>", label), Paragraph("ศก 0033.004/พิเศษ", body)],
        [Paragraph("<b>วันที่</b>", label), Paragraph("2 สิงหาคม 2569", body)],
        [Paragraph("<b>เรื่อง</b>", label), Paragraph("ขออนุมัติเบิกจ่ายเวชภัณฑ์จากคลังยาและเวชภัณฑ์กลาง", body)],
    ]
    meta = Table(meta_rows, colWidths=[23 * mm, doc.width - 23 * mm])
    meta.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("LINEBELOW", (0, -1), (-1, -1), 1.1, colors.black),
    ]))

    item_table = Table(
        [
            [Paragraph("ลำดับ", table_center), Paragraph("รายการ", table_center), Paragraph("ล็อต", table_center), Paragraph("วันหมดอายุ", table_center), Paragraph("จำนวน", table_center)],
            [
                Paragraph("1", table_center),
                Paragraph("หน้ากากอนามัย Xmask<br/><font size='13'>รหัส MSK-XMK-001</font>", table_text),
                Paragraph("MIG-023", table_center),
                Paragraph("2 กันยายน 2573", table_center),
                Paragraph("36 กล่อง", table_right),
            ],
            ["", Paragraph("รวมทั้งสิ้น", ParagraphStyle("Total", parent=table_text, fontName="THSarabunNew-Bold", alignment=TA_RIGHT)), "", "", Paragraph("36 กล่อง", ParagraphStyle("TotalValue", parent=table_right, fontName="THSarabunNew-Bold"))],
        ],
        colWidths=[14 * mm, 68 * mm, 24 * mm, 32 * mm, 27 * mm],
        repeatRows=1,
    )
    item_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, 0), "THSarabunNew-Bold"),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef4f2")),
        ("GRID", (0, 0), (-1, -1), 0.7, colors.HexColor("#333333")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("SPAN", (1, 2), (3, 2)),
        ("ALIGN", (0, 0), (0, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))

    signatures = Table(
        [[
            Paragraph("ลงชื่อ ..................................................<br/>(..................................................)<br/>ผู้เบิก", signature),
            Paragraph("ลงชื่อ ..................................................<br/>(..................................................)<br/>ผู้อนุมัติ", signature),
        ]],
        colWidths=[doc.width / 2, doc.width / 2],
    )
    signatures.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))

    story = [
        header,
        meta,
        Spacer(1, 5 * mm),
        Paragraph("<b>เรียน</b> นายแพทย์สาธารณสุขจังหวัดศรีสะเกษ", body),
        Paragraph(
            "ด้วยกองงานแพทย์แผนไทย โรงพยาบาลพยุห์ และหน่วยงาน NCD ทหาร มีความประสงค์ขอเบิกเวชภัณฑ์จากคลังยาและเวชภัณฑ์กลาง เพื่อใช้สนับสนุนการปฏิบัติงานและการให้บริการประชาชน โดยมีรายละเอียดดังต่อไปนี้",
            body_justify,
        ),
        Spacer(1, 2 * mm),
        item_table,
        Spacer(1, 5 * mm),
        Paragraph(
            "ทั้งนี้ ได้ตรวจสอบจำนวนคงเหลือ ล็อต และวันหมดอายุในระบบเรียบร้อยแล้ว อ้างอิงเอกสารเลขที่ MIG-XMASK-001 และข้อมูลการเบิกจากชีตชมรมร้านยา",
            body_justify,
        ),
        Paragraph("จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ", body_justify),
        Spacer(1, 13 * mm),
        KeepTogether(signatures),
        Spacer(1, 8 * mm),
        Paragraph("<b>หมายเหตุ:</b> เอกสารนี้เป็นตัวอย่างเพื่อแสดงรูปแบบ PDF จากระบบ โปรดตรวจสอบเลขที่หนังสือ ชื่อผู้ลงนาม และข้อมูลหน่วยงานก่อนนำไปใช้จริง", body_no_indent),
    ]

    doc.build(story)
    print(str(OUTPUT).encode("unicode_escape").decode("ascii"))


if __name__ == "__main__":
    build_pdf()
