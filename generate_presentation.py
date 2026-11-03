from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

OUTPUT = r"C:\Users\karolina.kaufmanp\OneDrive - Perficient, Inc\Desktop\ProyKK\CapstoneL1\Framework-Architecture-Client-Walkthrough.pptx"

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

NAVY = RGBColor(15, 37, 63)
BLUE = RGBColor(38, 84, 124)
LIGHT = RGBColor(242, 246, 250)
TEXT = RGBColor(45, 45, 45)
WHITE = RGBColor(255, 255, 255)
ACCENT = RGBColor(0, 120, 212)

slides = [
    (
        "Framework Architecture — Client Walkthrough",
        "Objective",
        [
            "Validate high-value e-commerce customer journeys on Automation Exercise.",
            "Reduce repetitive manual checks with maintainable, repeatable browser automation.",
            "Demonstrate modern quality practices beyond basic UI scripting.",
        ],
    ),
    (
        "Framework Architecture — Client Walkthrough",
        "Architecture",
        [
            "Playwright + TypeScript provide type-safe browser automation and parallel cross-browser runs.",
            "Page Object Model isolates UI selectors and actions in pages/.",
            "Fixtures create reusable page objects and provision a unique authenticated user for checkout.",
            "Test data and utilities separate scenario inputs from test logic.",
        ],
    ),
    (
        "Framework Architecture — Client Walkthrough",
        "Coverage",
        [
            "Registration, login, logout, and account cleanup.",
            "Data-driven product searches, add/remove cart behavior, checkout, and order confirmation.",
            "Contact form submission, axe-based accessibility scanning, a visual baseline, and a mocked network response.",
            "The same suite is configured for Chromium, Firefox, and WebKit.",
        ],
    ),
    (
        "Framework Architecture — Client Walkthrough",
        "Reliability and diagnostics",
        [
            "Unique generated emails allow parallel execution without shared user state.",
            "Locator auto-waiting and web-first assertions avoid arbitrary sleeps.",
            "HTML reporting, traces, screenshots, and videos are retained to diagnose failures.",
            "Retries and worker limits are configurable for CI through the CI environment variable.",
        ],
    ),
    (
        "Framework Architecture — Client Walkthrough",
        "Design decisions and next steps",
        [
            "Stable application test attributes and semantic locators are preferred; CSS selectors stay in page objects.",
            "The network-mocking example is deterministic and does not depend on catalog backend availability.",
            "Visual snapshots and the accessibility scan are intentionally scoped to stable, shared navigation.",
            "For production adoption: run against a controlled test environment, store credentials in a secret manager, add CI publishing, and expand accessibility/visual coverage with product-owner-approved baselines.",
        ],
    ),
]


def add_background(slide):
    bg = slide.background.fill
    bg.solid()
    bg.fore_color.rgb = LIGHT

    header = slide.shapes.add_shape(1, 0, 0, prs.slide_width, Inches(0.7))
    header.fill.solid()
    header.fill.fore_color.rgb = NAVY
    header.line.fill.background()

    footer = slide.shapes.add_shape(1, 0, prs.slide_height - Inches(0.35), prs.slide_width, Inches(0.35))
    footer.fill.solid()
    footer.fill.fore_color.rgb = BLUE
    footer.line.fill.background()


def add_title_block(slide, title, subtitle, index):
    title_box = slide.shapes.add_textbox(Inches(0.7), Inches(0.9), Inches(8.8), Inches(1.2))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    run = p.add_run()
    run.text = title
    run.font.name = 'Aptos Display'
    run.font.size = Pt(24)
    run.font.bold = True
    run.font.color.rgb = NAVY

    sub_box = slide.shapes.add_textbox(Inches(0.72), Inches(1.65), Inches(7.5), Inches(0.6))
    tf2 = sub_box.text_frame
    p2 = tf2.paragraphs[0]
    run2 = p2.add_run()
    run2.text = subtitle
    run2.font.name = 'Aptos'
    run2.font.size = Pt(28)
    run2.font.bold = True
    run2.font.color.rgb = ACCENT

    badge = slide.shapes.add_shape(1, Inches(11.6), Inches(0.95), Inches(1.0), Inches(1.0))
    badge.fill.solid()
    badge.fill.fore_color.rgb = ACCENT
    badge.line.fill.background()
    badge.text_frame.text = str(index)
    badge.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    badge.text_frame.paragraphs[0].runs[0].font.size = Pt(24)
    badge.text_frame.paragraphs[0].runs[0].font.bold = True
    badge.text_frame.paragraphs[0].runs[0].font.color.rgb = WHITE


def add_bullets(slide, bullets):
    box = slide.shapes.add_textbox(Inches(0.95), Inches(2.35), Inches(11.2), Inches(3.9))
    tf = box.text_frame
    tf.word_wrap = True
    tf.clear()

    for i, bullet in enumerate(bullets):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = bullet
        p.level = 0
        p.font.name = 'Aptos'
        p.font.size = Pt(22)
        p.font.color.rgb = TEXT
        p.space_after = Pt(14)
        p.bullet = True

for idx, (title, subtitle, bullets) in enumerate(slides, start=1):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_background(slide)
    add_title_block(slide, title, subtitle, idx)
    add_bullets(slide, bullets)

prs.save(OUTPUT)
print(OUTPUT)
