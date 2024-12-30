export function getAvatarUrl( file ) {
      if(!file) {
            return 'https://media.istockphoto.com/id/1495088043/it/vettoriale/icona-del-profilo-utente-avatar-o-icona-della-persona-immagine-del-profilo-simbolo-del.jpg?s=612x612&w=0&k=20&c=37n7zwsMgmgmXJz4XlwsDpLiOFMB3w-qFlpDCqJ5-BU='
      }

      return `https://aowonfqnafgpvfgiqujx.supabase.co/storage/v1/object/sign/avatars/${file}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuMzgwMzAzMjgzMzEzMzYyMy5qcGciLCJpYXQiOjE3MzU1NzEyMjUsImV4cCI6MTc2NzEwNzIyNX0.U5JCeRgB7YjE82VzxhIC5uPf1OW_dqLfqCcl5kEGwaQ&t=2024-12-30T15%3A07%3A06.197Z`
}