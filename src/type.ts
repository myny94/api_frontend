export type ChatStatisticsByDate = {
    chats_from_autosuggest_count: number
    chats_from_user_count: number
    chats_from_visitor_count: number
    conversation_count: number
    date: string
    missed_chat_count: number
    user_message_count: number
    visitor_message_count: number
    visitors_affected_by_chat_count: number
    visitors_autosuggested_count: number
    visitors_with_chat_count: number
    visitors_with_conversation_count: number
}

export type ChatStatistics = {
    by_date: ChatStatisticsByDate[]
    end_date: string
    room_id: string
    start_date: string
    total_chats_from_autosuggest_count: number
    total_chats_from_user_count: number
    total_chats_from_visitor_count: number
    total_conversation_count: number
    total_missed_chat_count: number
    total_user_message_count: number
    total_visitor_message_count: number
    total_visitors_affected_by_chat_count: number
    total_visitors_autosuggested_count: number
    total_visitors_with_chat_count: number
    total_visitors_with_conversation_count: number
}