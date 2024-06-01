import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import dayjs from 'dayjs'

interface IUsePdfGenerator {
  generate: (
    headers: Array<string>,
    data: Array<Array<string>>,
    title?: string,
    filename?: string
  ) => void
}

export const usePdfGenerator = (): IUsePdfGenerator => {
  const DEFAULT_FONT_SIZE = 16
  const doc = new jsPDF()

  const generate = (
    headers: Array<string>,
    data: Array<Array<string>>,
    title: string = 'Table Data',
    filename: string = 'productsData'
  ) => {
    doc.setFontSize(DEFAULT_FONT_SIZE)
    doc.text(title, 14, 18)

    doc.setFontSize(10)
    doc.text(dayjs().format('YYYY-MM-DD HH:mm:ss'), 14, 24)

    autoTable(doc, {
      margin: { top: 30 },
      head: [headers],
      body: data
    })

    doc.save(`${filename}.pdf`)
  }

  return {
    generate
  }
}
