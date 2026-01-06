
export type QuestionType = 'vocabulary' | 'essay';

export interface Question {
    id: string;
    type: QuestionType;
    subjectId: string;
    question: string;
    answer: string;
    keywords?: string[]; // For essay
    choices?: string[]; // For vocab
    importance: 1 | 2 | 3;
}

export const questions: Question[] = [
    // ==========================================
    // ① 原価計算 (Cost Accounting)
    // ==========================================
    // --- 論述 (Essay) ---
    {
        id: 'ca-es-1-1', type: 'essay', subjectId: 'cost-accounting',
        question: '建設業原価計算の目的について説明せよ。',
        answer: '適正な期間損益計算を行い、工事原価を管理し、実行予算との差異を分析して経営意思決定に役立てること。',
        keywords: ['期間損益', '管理', '差異', '意思決定'], importance: 3
    },
    {
        id: 'ca-es-1-2', type: 'essay', subjectId: 'cost-accounting',
        question: '工事別原価計算の意義について述べよ。',
        answer: '受注生産形態をとる建設業では、工事ごとに仕様が異なるため、個別工事単位で原価を集計し損益を明確にする必要がある。',
        keywords: ['受注生産', '個別', '損益', '集計'], importance: 3
    },
    {
        id: 'ca-es-1-3', type: 'essay', subjectId: 'cost-accounting',
        question: '個別原価計算と総合原価計算の違いについて説明せよ。',
        answer: '個別原価計算は顧客の注文ごとに原価を集計する方法、総合原価計算は規格品を連続生産し期間単位で計算する方法である。',
        keywords: ['注文', '集計', '規格品', '連続生産'], importance: 3
    },
    {
        id: 'ca-es-1-4', type: 'essay', subjectId: 'cost-accounting',
        question: '工事原価の範囲（工事直接費・工事間接費）について説明せよ。',
        answer: '工事原価は、施工に起因して発生する材料費、労務費、外注費、経費からなり、直接費と間接費に分類される。販管費は含まない。',
        keywords: ['施工', '材料', '労務', '外注', '経費'], importance: 3
    },
    {
        id: 'ca-es-2-1', type: 'essay', subjectId: 'cost-accounting',
        question: '直接費と間接費の分類基準について説明せよ。',
        answer: '特定の工事に直接認識・賦課できるものを直接費、複数の工事に関連し直接認識できないものを間接費とする。',
        keywords: ['特定', '認識', '複数', '賦課'], importance: 3
    },
    {
        id: 'ca-es-2-2', type: 'essay', subjectId: 'cost-accounting',
        question: '変動費と固定費の違いについて説明せよ。',
        answer: '操業度（工事量）の増減に比例して変動する原価を変動費、増減に関わらず一定額発生する原価を固定費という。',
        keywords: ['操業度', '比例', '一定'], importance: 3
    },
    {
        id: 'ca-es-2-3', type: 'essay', subjectId: 'cost-accounting',
        question: '製造原価と期間原価の違いについて説明せよ。',
        answer: '製造原価は工事完成まで資産計上され売上時に費用化されるが、期間原価は発生した期間に直ちに費用処理される。',
        keywords: ['資産計上', '売上時', '直ちに', '費用'], importance: 3
    },
    {
        id: 'ca-es-2-4', type: 'essay', subjectId: 'cost-accounting',
        question: '管理可能費と管理不能費の区分について説明せよ。',
        answer: '特定の管理者がその発生を管理・統制できるか否かで区分し、業績評価に用いる。',
        keywords: ['管理者', '統制', '業績評価'], importance: 3
    },
    {
        id: 'ca-es-3-1', type: 'essay', subjectId: 'cost-accounting',
        question: '配賦の意義について述べよ。',
        answer: '共通的に発生する間接費を、一定の合理的な基準を用いて各工事に割り当て、適正な原価計算を行う手続き。',
        keywords: ['共通', '基準', '割り当て'], importance: 3
    },
    {
        id: 'ca-es-3-2', type: 'essay', subjectId: 'cost-accounting',
        question: '予定配賦の必要性について説明せよ。',
        answer: '計算の迅速化と、操業度変動による単位当たり固定費の偶然的変動の排除（正常性の確保）のため。',
        keywords: ['迅速化', '排除', '正常性'], importance: 3
    },
    {
        id: 'ca-es-3-3', type: 'essay', subjectId: 'cost-accounting',
        question: '実際配賦と予定配賦の違いについて述べよ。',
        answer: '実際配賦は実際発生額を用いるが、予定配賦はあらかじめ定めた予定配賦率に実際基準数値を乗じて計算する。',
        keywords: ['実際発生額', '予定配賦率'], importance: 3
    },
    {
        id: 'ca-es-4-1', type: 'essay', subjectId: 'cost-accounting',
        question: '原価差異分析の管理会計的意義について述べよ。',
        answer: '例外管理（重要な差異への注力）を可能にし、責任所在を明確化して改善活動につなげる点。',
        keywords: ['例外管理', '改善'], importance: 3
    },
    {
        id: 'ca-es-5-1', type: 'essay', subjectId: 'cost-accounting',
        question: '標準原価計算の目的について説明せよ。',
        answer: '科学的基準に基づく目標原価により原価管理を効果的に行うこと、および計算の迅速化・簡略化。',
        keywords: ['目標原価', '原価管理', '迅速化'], importance: 3
    },
    {
        id: 'ca-es-6-1', type: 'essay', subjectId: 'cost-accounting',
        question: '工事間接費配賦の問題点について説明せよ。',
        answer: '配賦基準の選び方によって各工事の負担額が変わり、工事別利益が変動してしまう点。',
        keywords: ['配賦基準', '負担額', '変動'], importance: 2
    },
    {
        id: 'ca-es-7-1', type: 'essay', subjectId: 'cost-accounting',
        question: '本社費を原価に含める理由について説明せよ。',
        answer: '本社も工事施工に貢献しており、これらを回収すべきコスト（フルコスト）として認識するため。',
        keywords: ['貢献', '回収', 'フルコスト'], importance: 2
    },
    {
        id: 'ca-es-8-1', type: 'essay', subjectId: 'cost-accounting',
        question: '原価低減と原価改善の違いについて説明せよ。',
        answer: '原価低減（原価企画）は設計段階等での抜本的なコストダウン、原価改善（原価維持）は施工段階での標準値遵守活動を指す。',
        keywords: ['設計', '抜本的', '施工', '遵守'], importance: 2
    },
    {
        id: 'ca-es-9-1', type: 'essay', subjectId: 'cost-accounting',
        question: '工事進行基準の考え方について説明せよ。',
        answer: '工事の進捗度合いに応じて、その会計期間に発生したと認められる収益と費用を計上する方法。',
        keywords: ['進捗度', '収益', '費用', '計上'], importance: 2
    },
    // --- [NEW] Cost Accounting 類題・追加問題 (Essay) ---
    {
        id: 'ca-es-10-1', type: 'essay', subjectId: 'cost-accounting',
        question: '材料費と労務費の計算方法の違いについて説明せよ。',
        answer: '材料費は消費量に消費価格を乗じて計算し、労務費は作業時間に賃率を乗じて計算する点が異なる。',
        keywords: ['消費量', '消費価格', '作業時間', '賃率'], importance: 3
    },
    {
        id: 'ca-es-10-2', type: 'essay', subjectId: 'cost-accounting',
        question: '外注費と労務費の区分について説明せよ。',
        answer: '雇用契約に基づく対価は労務費、請負契約に基づき特定の工事作業を委託する対価は外注費となる。',
        keywords: ['雇用契約', '請負契約', '委託'], importance: 3
    },
    {
        id: 'ca-es-11-1', type: 'essay', subjectId: 'cost-accounting',
        question: '部門別原価計算の目的を述べよ。',
        answer: '原価の発生場所を明確にし、部門管理者の責任を問うとともに、製品（工事）へのより正確な配賦を行うため。',
        keywords: ['発生場所', '責任', '正確', '配賦'], importance: 2
    },
    {
        id: 'ca-es-11-2', type: 'essay', subjectId: 'cost-accounting',
        question: '補助部門費の配賦方法（直接配賦法と相互配賦法）の違いについて説明せよ。',
        answer: '直接配賦法は補助部門間のサービスのやり取りを無視するが、相互配賦法はこれを考慮して計算するより正確な方法である。',
        keywords: ['サービス', '無視', '考慮', '正確'], importance: 2
    },
    {
        id: 'ca-es-12-1', type: 'essay', subjectId: 'cost-accounting',
        question: '機会原価（オポチュニティ・コスト）について説明せよ。',
        answer: 'ある代替案を選択したことによって、他の最善の案を選択していれば得られたはずの利益（逸失利益）。',
        keywords: ['代替案', '最善', '逸失利益'], importance: 2
    },
    {
        id: 'ca-es-13-1', type: 'essay', subjectId: 'cost-accounting',
        question: 'ABC（活動基準原価計算）のメリットについて述べよ。',
        answer: '従来の配賦基準（工数等）では見えなかったコスト発生要因（ドライバー）を用いることで、より正確な原価計算とコスト管理が可能になる。',
        keywords: ['配賦基準', 'ドライバー', '正確', '管理'], importance: 2
    },

    // --- 語句 (Vocab) ---
    { id: 'ca-voc-001', type: 'vocabulary', subjectId: 'cost-accounting', question: '特定の目的のために消費された経済的価値。', answer: '原価', choices: ['原価', '費用', '損失'], importance: 3 },
    { id: 'ca-voc-002', type: 'vocabulary', subjectId: 'cost-accounting', question: '工事ごとに原価を集計する計算方法。', answer: '個別原価計算', choices: ['個別原価計算', '総合原価計算'], importance: 3 },
    { id: 'ca-voc-003', type: 'vocabulary', subjectId: 'cost-accounting', question: '特定の対象に直課できる原価。', answer: '直接費', choices: ['直接費', '間接費'], importance: 3 },
    { id: 'ca-voc-004', type: 'vocabulary', subjectId: 'cost-accounting', question: '複数の対象に関連する原価。', answer: '間接費', choices: ['間接費', '直接費'], importance: 3 },
    { id: 'ca-voc-005', type: 'vocabulary', subjectId: 'cost-accounting', question: '操業度に応じて変動する原価。', answer: '変動費', choices: ['変動費', '固定費'], importance: 3 },
    { id: 'ca-voc-006', type: 'vocabulary', subjectId: 'cost-accounting', question: '操業度に関わらず一定の原価。', answer: '固定費', choices: ['固定費', '変動費'], importance: 3 },
    { id: 'ca-voc-007', type: 'vocabulary', subjectId: 'cost-accounting', question: '管理者がコントロールできる原価。', answer: '管理可能費', choices: ['管理可能費', '管理不能費'], importance: 3 },
    { id: 'ca-voc-008', type: 'vocabulary', subjectId: 'cost-accounting', question: '間接費を割り振ること。', answer: '配賦', choices: ['配賦', '直課'], importance: 3 },
    { id: 'ca-voc-009', type: 'vocabulary', subjectId: 'cost-accounting', question: 'あらかじめ決めた率で配賦すること。', answer: '予定配賦', choices: ['予定配賦', '実際配賦'], importance: 3 },
    { id: 'ca-voc-010', type: 'vocabulary', subjectId: 'cost-accounting', question: '予定と実際の配賦額のズレ。', answer: '配賦差異', choices: ['配賦差異', '原価差額'], importance: 3 },
    { id: 'ca-voc-011', type: 'vocabulary', subjectId: 'cost-accounting', question: '標準（予定）と実際の差。', answer: '原価差異', choices: ['原価差異', '操業度差異'], importance: 3 },
    { id: 'ca-voc-012', type: 'vocabulary', subjectId: 'cost-accounting', question: '単価の違いによる差異。', answer: '価格差異', choices: ['価格差異', '数量差異'], importance: 3 },
    { id: 'ca-voc-013', type: 'vocabulary', subjectId: 'cost-accounting', question: '消費量の違いによる差異。', answer: '数量差異', choices: ['数量差異', '価格差異'], importance: 3 },
    { id: 'ca-voc-014', type: 'vocabulary', subjectId: 'cost-accounting', question: '目標となる原価。', answer: '標準原価', choices: ['標準原価', '実際原価'], importance: 3 },
    { id: 'ca-voc-015', type: 'vocabulary', subjectId: 'cost-accounting', question: '現場共通の間接費。', answer: '工事間接費', choices: ['工事間接費', '本社費'], importance: 2 },
    { id: 'ca-voc-016', type: 'vocabulary', subjectId: 'cost-accounting', question: '全社共通の費用。', answer: '共通費', choices: ['共通費', '個別費'], importance: 2 },
    { id: 'ca-voc-017', type: 'vocabulary', subjectId: 'cost-accounting', question: '原価をコントロールする活動。', answer: '原価管理', choices: ['原価管理', '原価計算'], importance: 2 },
    { id: 'ca-voc-018', type: 'vocabulary', subjectId: 'cost-accounting', question: '進捗に応じて収益費用を計上する基準。', answer: '工事進行基準', choices: ['工事進行基準', '工事完成基準'], importance: 2 },
    { id: 'ca-voc-019', type: 'vocabulary', subjectId: 'cost-accounting', question: '実施のための詳細予算。', answer: '実行予算', choices: ['実行予算', '見積予算'], importance: 2 },
    // --- [NEW] Cost Accounting 類題・追加問題 (Vocab) ---
    { id: 'ca-voc-020', type: 'vocabulary', subjectId: 'cost-accounting', question: '工事現場で働く作業員の賃金。', answer: '直接労務費', choices: ['直接労務費', '間接労務費'], importance: 3 },
    { id: 'ca-voc-021', type: 'vocabulary', subjectId: 'cost-accounting', question: '現場監督や事務員の給料。', answer: '間接労務費', choices: ['間接労務費', '直接労務費'], importance: 3 },
    { id: 'ca-voc-022', type: 'vocabulary', subjectId: 'cost-accounting', question: '雇用関係にない外部業者への対価。', answer: '外注費', choices: ['外注費', '労務費'], importance: 3 },
    { id: 'ca-voc-023', type: 'vocabulary', subjectId: 'cost-accounting', question: '原価の集計単位となる場所。', answer: '原価部門', choices: ['原価部門', '原価中心'], importance: 2 },
    { id: 'ca-voc-024', type: 'vocabulary', subjectId: 'cost-accounting', question: '複数の部門に共通する費用の配賦基準。', answer: '配賦基準', choices: ['配賦基準', '操業度'], importance: 2 },
    { id: 'ca-voc-025', type: 'vocabulary', subjectId: 'cost-accounting', question: '予定配賦率 × 実際操業度', answer: '予定配賦額', choices: ['予定配賦額', '実際発生額'], importance: 3 },
    { id: 'ca-voc-026', type: 'vocabulary', subjectId: 'cost-accounting', question: '能率の良し悪しによる差異。', answer: '能率差異', choices: ['能率差異', '予算差異'], importance: 3 },
    { id: 'ca-voc-027', type: 'vocabulary', subjectId: 'cost-accounting', question: '固定費の配賦不足・超過による差異。', answer: '操業度差異', choices: ['操業度差異', '管理不能差異'], importance: 3 },
    { id: 'ca-voc-028', type: 'vocabulary', subjectId: 'cost-accounting', question: '加工費を配賦する原価計算。', answer: '部門別計算', choices: ['部門別計算', '直接原価計算'], importance: 2 },
    { id: 'ca-voc-029', type: 'vocabulary', subjectId: 'cost-accounting', question: '意思決定において埋没してしまう原価。', answer: '埋没原価', choices: ['埋没原価', '機会原価'], importance: 2 },

    // ==========================================
    // ② 財務分析 (Financial Analysis)
    // ==========================================
    // --- 論述 (Essay) ---
    {
        id: 'fa-es-1-1', type: 'essay', subjectId: 'financial-analysis',
        question: '財務分析の2つの主要な目的（利用者別の視点）を述べよ。',
        answer: '経営者が経営管理や意思決定に役立てる内部目的と、金融機関等が企業の信用力を評価する外部目的がある。',
        keywords: ['経営管理', '意思決定', '信用力'], importance: 3
    },
    {
        id: 'fa-es-2-1', type: 'essay', subjectId: 'financial-analysis',
        question: '流動比率と当座比率の違いと、それぞれの分析的意義を述べよ。',
        answer: '流動比率は流動資産全体で短期支払能力を見るが、当座比率は換金性の低い棚卸資産を除外するため、より厳密な支払能力を示す。',
        keywords: ['流動資産', '棚卸資産', '除外', '厳密'], importance: 3
    },
    {
        id: 'fa-es-2-2', type: 'essay', subjectId: 'financial-analysis',
        question: '固定長期適合率が100%以下であることが望ましい理由を説明せよ。',
        answer: '長期使用する固定資産は、返済義務のない自己資本か長期の固定負債で賄われるべきだから。',
        keywords: ['固定資産', '自己資本', '固定負債', '賄われる'], importance: 3
    },
    {
        id: 'fa-es-3-1', type: 'essay', subjectId: 'financial-analysis',
        question: '売上高総利益率と売上高営業利益率の違いについて説明せよ。',
        answer: '総利益率は製品・工事の収益力を示し、営業利益率は販売・管理コストを引いた本業全体の収益性・効率性を示す。',
        keywords: ['工事', '収益力', '本業', '効率性'], importance: 3
    },
    {
        id: 'fa-es-3-2', type: 'essay', subjectId: 'financial-analysis',
        question: '自己資本利益率（ROE）を高めるための要素をデュポンシステムに基づき挙げよ。',
        answer: '売上高当期純利益率（収益性）、総資本回転率（効率性）、財務レバレッジ（負債の活用）の3要素。',
        keywords: ['収益性', '効率性', '財務レバレッジ'], importance: 3
    },
    {
        id: 'fa-es-4-1', type: 'essay', subjectId: 'financial-analysis',
        question: '建設業で工事未収入金や未成工事支出金に注目すべき理由を述べよ。',
        answer: '金額が膨らみやすく、回収遅れや不採算工事のコスト滞留（不良資産化）のリスクが含まれていないか確認が必要なため。',
        keywords: ['回収遅れ', '不採算', '不良資産'], importance: 3
    },
    {
        id: 'fa-es-5-1', type: 'essay', subjectId: 'financial-analysis',
        question: '総資本回転率が意味する内容を説明せよ。',
        answer: '投下された総資本が1年間に何回売上高として回収されたかを示し、資本の運用効率を表す。',
        keywords: ['投下', '回収', '運用効率'], importance: 2
    },
    {
        id: 'fa-es-6-1', type: 'essay', subjectId: 'financial-analysis',
        question: '労働生産性を向上させる手段を2点述べよ。',
        answer: '高付加価値化や機械化で付加価値額（分子）を増やす、または省力化で従業員数（分母）を適正化すること。',
        keywords: ['付加価値額', '従業員数', '機械化', '省力化'], importance: 2
    },
    {
        id: 'fa-es-7-1', type: 'essay', subjectId: 'financial-analysis',
        question: '財務分析の限界点を挙げよ。',
        answer: '過去のデータであるため将来を保証しない点、および会計処理の違いにより企業間比較が困難になる点。',
        keywords: ['過去', '将来', '会計処理'], importance: 2
    },
    // --- [NEW] Financial Analysis 類題・追加問題 (Essay) ---
    {
        id: 'fa-es-8-1', type: 'essay', subjectId: 'financial-analysis',
        question: '損益分岐点分析（CVP分析）の目的について説明せよ。',
        answer: '売上高、費用、利益の関係を分析し、目標利益を達成するために必要な売上高や費用の許容範囲を明らかにすること。',
        keywords: ['関係', '目標利益', '必要な売上高'], importance: 3
    },
    {
        id: 'fa-es-8-2', type: 'essay', subjectId: 'financial-analysis',
        question: '安全余裕率の計算式と意味について述べよ。',
        answer: '計算式は（売上高 － 損益分岐点売上高）÷ 売上高。現在の売上が損益分岐点からどれだけ離れており、余裕があるかを示す。',
        keywords: ['損益分岐点', '余裕'], importance: 3
    },
    {
        id: 'fa-es-9-1', type: 'essay', subjectId: 'financial-analysis',
        question: 'インタレスト・カバレッジ・レシオの意義について説明せよ。',
        answer: '事業利益が金融費用（支払利息等）の何倍あるかを示し、利払い能力の安全性を測る指標である。',
        keywords: ['事業利益', '金融費用', '利払い能力'], importance: 2
    },
    {
        id: 'fa-es-10-1', type: 'essay', subjectId: 'financial-analysis',
        question: '付加価値の控除法（中小企業庁方式）における構成要素を挙げよ。',
        answer: '営業純益、人件費、金融費用、賃借料、租税公課、減価償却費。',
        keywords: ['営業純益', '人件費', '金融費用'], importance: 2
    },
    {
        id: 'fa-es-11-1', type: 'essay', subjectId: 'financial-analysis',
        question: '建設業における経営事項審査（経審）の意義を簡単に述べよ。',
        answer: '公共工事を直接請け負う建設業者が必ず受けなければならない審査で、経営状況や経営規模を客観的に数値化して評価するもの。',
        keywords: ['公共工事', '審査', '客観的', '数値化'], importance: 2
    },

    // --- 語句 (Vocab) ---
    { id: 'fa-voc-001', type: 'vocabulary', subjectId: 'financial-analysis', question: '財務データを用いて経営実態を把握する手法。', answer: '財務分析', choices: ['財務分析', '原価計算'], importance: 3 },
    { id: 'fa-voc-002', type: 'vocabulary', subjectId: 'financial-analysis', question: '支払い能力を分析する指標群。', answer: '安全性分析', choices: ['安全性分析', '収益性分析'], importance: 3 },
    { id: 'fa-voc-003', type: 'vocabulary', subjectId: 'financial-analysis', question: '流動資産 ÷ 流動負債 × 100 (%)', answer: '流動比率', choices: ['流動比率', '当座比率'], importance: 3 },
    { id: 'fa-voc-004', type: 'vocabulary', subjectId: 'financial-analysis', question: '当座資産 ÷ 流動負債 × 100 (%)', answer: '当座比率', choices: ['当座比率', '流動比率'], importance: 3 },
    { id: 'fa-voc-005', type: 'vocabulary', subjectId: 'financial-analysis', question: '自己資本 ÷ 総資本 × 100 (%)', answer: '自己資本比率', choices: ['自己資本比率', '負債比率'], importance: 3 },
    { id: 'fa-voc-006', type: 'vocabulary', subjectId: 'financial-analysis', question: '固定資産 ÷ (自己資本 + 固定負債) × 100 (%)', answer: '固定長期適合率', choices: ['固定長期適合率', '固定比率'], importance: 3 },
    { id: 'fa-voc-007', type: 'vocabulary', subjectId: 'financial-analysis', question: '儲ける力を分析する指標群。', answer: '収益性分析', choices: ['収益性分析', '安全性分析'], importance: 3 },
    { id: 'fa-voc-008', type: 'vocabulary', subjectId: 'financial-analysis', question: '売上総利益 ÷ 売上高 × 100 (%)', answer: '売上高総利益率', choices: ['売上高総利益率', '売上高営業利益率'], importance: 3 },
    { id: 'fa-voc-009', type: 'vocabulary', subjectId: 'financial-analysis', question: '当期純利益 ÷ 自己資本 × 100 (%)', answer: '自己資本利益率', choices: ['自己資本利益率', '総資本利益率'], importance: 3 },
    { id: 'fa-voc-010', type: 'vocabulary', subjectId: 'financial-analysis', question: '資本の利用効率を分析する指標群。', answer: '効率性分析', choices: ['効率性分析', '収益性分析'], importance: 2 },
    { id: 'fa-voc-011', type: 'vocabulary', subjectId: 'financial-analysis', question: '売上高 ÷ 総資本 (回)', answer: '総資本回転率', choices: ['総資本回転率', '売上債権回転率'], importance: 2 },
    { id: 'fa-voc-012', type: 'vocabulary', subjectId: 'financial-analysis', question: '付加価値額 ÷ 従業員数', answer: '労働生産性', choices: ['労働生産性', '資本生産性'], importance: 2 },
    { id: 'fa-voc-013', type: 'vocabulary', subjectId: 'financial-analysis', question: '企業が生み出した新たな経済的価値。', answer: '付加価値', choices: ['付加価値', '利益'], importance: 2 },
    // --- [NEW] Financial Analysis 類題・追加問題 (Vocab) ---
    { id: 'fa-voc-014', type: 'vocabulary', subjectId: 'financial-analysis', question: '売上高と総費用のグラフが交わる点。', answer: '損益分岐点', choices: ['損益分岐点', '操業短縮点'], importance: 3 },
    { id: 'fa-voc-015', type: 'vocabulary', subjectId: 'financial-analysis', question: '売上高 － 変動費', answer: '限界利益', choices: ['限界利益', '営業利益'], importance: 3 },
    { id: 'fa-voc-016', type: 'vocabulary', subjectId: 'financial-analysis', question: '限界利益 ÷ 売上高', answer: '限界利益率', choices: ['限界利益率', '変動費率'], importance: 3 },
    { id: 'fa-voc-017', type: 'vocabulary', subjectId: 'financial-analysis', question: '売上高に対する安全性の余裕度。', answer: '安全余裕率', choices: ['安全余裕率', '損益分岐点比率'], importance: 3 },
    { id: 'fa-voc-018', type: 'vocabulary', subjectId: 'financial-analysis', question: '事業利益 ÷ 金融費用 (倍)', answer: 'インタレストカバレッジレシオ', choices: ['インタレストカバレッジレシオ', '固定比率'], importance: 2 },
    { id: 'fa-voc-019', type: 'vocabulary', subjectId: 'financial-analysis', question: '売上高 ÷ 売上債権 (回)', answer: '売上債権回転率', choices: ['売上債権回転率', '棚卸資産回転率'], importance: 2 },
    { id: 'fa-voc-020', type: 'vocabulary', subjectId: 'financial-analysis', question: '従業員一人当たりの有形固定資産額。', answer: '労働装備率', choices: ['労働装備率', '労働生産性'], importance: 2 },
    { id: 'fa-voc-021', type: 'vocabulary', subjectId: 'financial-analysis', question: '有形固定資産が生み出す付加価値。', answer: '資本生産性', choices: ['資本生産性', '労働生産性'], importance: 2 },
    { id: 'fa-voc-022', type: 'vocabulary', subjectId: 'financial-analysis', question: '総資本に対する経常利益の割合。', answer: '総資本経常利益率', choices: ['総資本経常利益率', '自己資本利益率'], importance: 2 },
    { id: 'fa-voc-023', type: 'vocabulary', subjectId: 'financial-analysis', question: '財務レバレッジを活用する効果。', answer: 'レバレッジ効果', choices: ['レバレッジ効果', 'シナジー効果'], importance: 2 },


    // ==========================================
    // ③ 財務諸表 (Financial Statements)
    // ==========================================
    // --- 論述 (Essay) ---
    {
        id: 'fs-es-1-1', type: 'essay', subjectId: 'financial-statements',
        question: '財務諸表の作成目的（利害調整と情報提供）について述べよ。',
        answer: '株主・債権者間の利害調整（配当計算等）と、投資家の意思決定に役立つ情報の提供である。',
        keywords: ['利害調整', '情報提供', '意思決定'], importance: 3
    },
    {
        id: 'fs-es-1-2', type: 'essay', subjectId: 'financial-statements',
        question: 'キャッシュ・フロー計算書が必要とされる理由を述べよ。',
        answer: '利益と資金（現金）の不一致があるため、支払能力や資金の健全性を判断するには現金の収支情報が不可欠だから。',
        keywords: ['不一致', '支払能力', '現金'], importance: 3
    },
    {
        id: 'fs-es-2-1', type: 'essay', subjectId: 'financial-statements',
        question: 'B/Sの「流動」と「固定」の分類基準について説明せよ。',
        answer: '正常営業循環基準（営業サイクル内なら流動）と、一年基準（決算翌日から1年以内に入出金なら流動）を適用して分類する。',
        keywords: ['正常営業循環', '一年基準', 'サイクル'], importance: 3
    },
    {
        id: 'fs-es-3-1', type: 'essay', subjectId: 'financial-statements',
        question: '費用収益対応の原則における「個別的対応」と「期間的対応」について説明せよ。',
        answer: '個別的対応は売上高と売上原価のような直接的な対応、期間的対応は販管費のように会計期間に基づく対応である。',
        keywords: ['売上高', '直接的', '期間的'], importance: 3
    },
    {
        id: 'fs-es-4-1', type: 'essay', subjectId: 'financial-statements',
        question: '建設業の「未成工事支出金」はどのような資産か説明せよ。',
        answer: '完成引渡し前の工事に投入された原価の集計額であり、一般製造業の仕掛品に相当する棚卸資産である。',
        keywords: ['完成引渡し前', '原価', '仕掛品'], importance: 3
    },
    {
        id: 'fs-es-5-1', type: 'essay', subjectId: 'financial-statements',
        question: 'CF計算書の3つの区分（営業、投資、財務）の内容を述べよ。',
        answer: '営業CFは本業の資金増減、投資CFは設備・証券投資の増減、財務CFは資金調達・返済による増減を表す。',
        keywords: ['本業', '投資', '調達', '返済'], importance: 2
    },
    {
        id: 'fs-es-6-1', type: 'essay', subjectId: 'financial-statements',
        question: '継続企業の前提（ゴーイング・コンサーン）が重要な理由を述べよ。',
        answer: '事業の無期限継続を仮定することで、取得原価主義や減価償却などの期間配分計算が正当化されるから。',
        keywords: ['無期限', '継続', '期間配分'], importance: 2
    },
    {
        id: 'fs-es-6-2', type: 'essay', subjectId: 'financial-statements',
        question: '重要性の原則について説明せよ。',
        answer: '重要性の乏しいものは簡便な処理を認め、重要なものは厳密な処理を求める原則。',
        keywords: ['簡便', '厳密', '重要性'], importance: 2
    },
    {
        id: 'fs-es-7-1', type: 'essay', subjectId: 'financial-statements',
        question: '注記の役割について述べよ。',
        answer: '財務諸表本体以外で重要な会計方針や補足情報を記載し、利用者の理解と判断を助けるもの。',
        keywords: ['補足情報', '理解', '判断'], importance: 1
    },
    // --- [NEW] Financial Statements 類題・追加問題 (Essay) ---
    {
        id: 'fs-es-8-1', type: 'essay', subjectId: 'financial-statements',
        question: '税効果会計が必要とされる理由を説明せよ。',
        answer: '企業会計（収益・費用）と税務会計（益金・損金）の認識時期のズレを調整し、税引後当期純利益を期間的に合理的に表示するため。',
        keywords: ['企業会計', '税務会計', 'ズレ', '合理的'], importance: 3
    },
    {
        id: 'fs-es-8-2', type: 'essay', subjectId: 'financial-statements',
        question: '繰延税金資産の回収可能性とは何か。',
        answer: '将来の課税所得によって、将来減算一時差異が解消され、税金の減額効果が実際に得られる見込みのこと。',
        keywords: ['課税所得', '解消', '減額効果'], importance: 3
    },
    {
        id: 'fs-es-9-1', type: 'essay', subjectId: 'financial-statements',
        question: 'JV（共同企業体）の会計処理方法（独立会計方式）について説明せよ。',
        answer: 'JV自体を独立した会計単位とみなし、構成員はJVへの出資とそこからの損益取り込みのみを行う方法。',
        keywords: ['独立', '会計単位', '出資', '損益'], importance: 2
    },
    {
        id: 'fs-es-10-1', type: 'essay', subjectId: 'financial-statements',
        question: 'ファイナンス・リース取引の判定要件を述べよ。',
        answer: '中途解約不能（ノンキャンセラブル）かつ、フルペイアウト（コストのほぼ全額を負担）する場合に該当する。',
        keywords: ['中途解約不能', 'フルペイアウト'], importance: 2
    },
    {
        id: 'fs-es-10-2', type: 'essay', subjectId: 'financial-statements',
        question: 'オペレーティング・リース取引の会計処理について述べよ。',
        answer: '通常の賃貸借取引と同様に、リース料支払い時に費用処理を行う。',
        keywords: ['通常の賃貸借', '費用処理'], importance: 2
    },

    // --- 語句 (Vocab) ---
    { id: 'fs-voc-001', type: 'vocabulary', subjectId: 'financial-statements', question: '利害関係者に報告するための書類。', answer: '財務諸表', choices: ['財務諸表', '事業報告'], importance: 3 },
    { id: 'fs-voc-002', type: 'vocabulary', subjectId: 'financial-statements', question: '一定時点の財政状態を表す表。', answer: '貸借対照表', choices: ['貸借対照表', '損益計算書'], importance: 3 },
    { id: 'fs-voc-003', type: 'vocabulary', subjectId: 'financial-statements', question: '資金の運用形態（借方）。', answer: '資産', choices: ['資産', '負債'], importance: 3 },
    { id: 'fs-voc-004', type: 'vocabulary', subjectId: 'financial-statements', question: '資金調達源泉のうち返済義務のあるもの（貸方）。', answer: '負債', choices: ['負債', '資産'], importance: 3 },
    { id: 'fs-voc-005', type: 'vocabulary', subjectId: 'financial-statements', question: '資産から負債を引いた正味財産。', answer: '純資産', choices: ['純資産', '総資産'], importance: 3 },
    { id: 'fs-voc-006', type: 'vocabulary', subjectId: 'financial-statements', question: '一定期間の経営成績を表す表。', answer: '損益計算書', choices: ['損益計算書', '貸借対照表'], importance: 3 },
    { id: 'fs-voc-007', type: 'vocabulary', subjectId: 'financial-statements', question: '建設業における売上高。', answer: '完成工事高', choices: ['完成工事高', '売上高'], importance: 3 },
    { id: 'fs-voc-008', type: 'vocabulary', subjectId: 'financial-statements', question: '本業の活動から得た利益。', answer: '営業利益', choices: ['営業利益', '経常利益'], importance: 3 },
    { id: 'fs-voc-009', type: 'vocabulary', subjectId: 'financial-statements', question: '工事進行中の支出を集計した資産。', answer: '未成工事支出金', choices: ['未成工事支出金', '完成工事未収入金'], importance: 3 },
    { id: 'fs-voc-010', type: 'vocabulary', subjectId: 'financial-statements', question: '工事完成前に受け取った代金。', answer: '未成工事受入金', choices: ['未成工事受入金', '前受金'], importance: 3 },
    { id: 'fs-voc-011', type: 'vocabulary', subjectId: 'financial-statements', question: '現金の流れを表す計算書。', answer: 'キャッシュ・フロー計算書', choices: ['キャッシュ・フロー計算書', '損益計算書'], importance: 2 },
    { id: 'fs-voc-012', type: 'vocabulary', subjectId: 'financial-statements', question: '事業を継続するという前提。', answer: '継続企業の前提', choices: ['継続企業の前提', '会計公準'], importance: 2 },
    { id: 'fs-voc-013', type: 'vocabulary', subjectId: 'financial-statements', question: '経済的事実の発生に基づく認識基準。', answer: '発生主義', choices: ['発生主義', '現金主義'], importance: 2 },
    { id: 'fs-voc-014', type: 'vocabulary', subjectId: 'financial-statements', question: '費用と収益を対応させる原則。', answer: '費用収益対応の原則', choices: ['費用収益対応の原則', '発生主義'], importance: 2 },
    { id: 'fs-voc-015', type: 'vocabulary', subjectId: 'financial-statements', question: '重要な情報の補足記載。', answer: '注記', choices: ['注記', '明細書'], importance: 1 },
    // --- [NEW] Financial Statements 類題・追加問題 (Vocab) ---
    { id: 'fs-voc-016', type: 'vocabulary', subjectId: 'financial-statements', question: '会計と税務の差異を調整する手続き。', answer: '税効果会計', choices: ['税効果会計', '連結会計'], importance: 3 },
    { id: 'fs-voc-017', type: 'vocabulary', subjectId: 'financial-statements', question: '将来税金を減らす効果のある資産。', answer: '繰延税金資産', choices: ['繰延税金資産', '繰延税金負債'], importance: 3 },
    { id: 'fs-voc-018', type: 'vocabulary', subjectId: 'financial-statements', question: '複数の企業が共同で工事を行う組織。', answer: '共同企業体', choices: ['共同企業体', '株式会社'], importance: 3 },
    { id: 'fs-voc-019', type: 'vocabulary', subjectId: 'financial-statements', question: 'JV (Joint Venture)。', answer: '共同企業体', choices: ['共同企業体', '合併'], importance: 3 },
    { id: 'fs-voc-020', type: 'vocabulary', subjectId: 'financial-statements', question: '売買処理と同様に扱うリース。', answer: 'ファイナンス・リース', choices: ['ファイナンス・リース', 'オペレーティング・リース'], importance: 2 },
    { id: 'fs-voc-021', type: 'vocabulary', subjectId: 'financial-statements', question: '賃貸借処理を行うリース。', answer: 'オペレーティング・リース', choices: ['オペレーティング・リース', 'ファイナンス・リース'], importance: 2 },
    { id: 'fs-voc-022', type: 'vocabulary', subjectId: 'financial-statements', question: '資産の保有に伴う利益や損失を含めない利益。', answer: '包括利益', choices: ['包括利益', '当期純利益'], importance: 2 },
    { id: 'fs-voc-023', type: 'vocabulary', subjectId: 'financial-statements', question: '将来の支出に備えて計上する負債。', answer: '引当金', choices: ['引当金', '未払金'], importance: 2 },
    { id: 'fs-voc-024', type: 'vocabulary', subjectId: 'financial-statements', question: '工事完成後の保証に備える引当金。', answer: '完成工事補償引当金', choices: ['完成工事補償引当金', '貸倒引当金'], importance: 2 },
    { id: 'fs-voc-025', type: 'vocabulary', subjectId: 'financial-statements', question: '正当な理由がない限り会計処理を変更してはならない原則。', answer: '継続性の原則', choices: ['継続性の原則', '真実性の原則'], importance: 2 },
];
